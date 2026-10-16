import { NextResponse } from "next/server";
import { saveResumeFile, saveApplicationRecord, JobApplicationRecord } from "@/lib/storage";
import { sendApplicationToHR, sendConfirmationToApplicant } from "@/lib/mailer";
import { sendToGoogleSheetWebhook } from "@/lib/googleSheet";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let phone = "";
    let role = "";
    let message = "";
    let honeypot = "";
    let resumeFile: File | null = null;
    let resumeBuffer: Buffer | undefined = undefined;
    let resumeFileName = "";
    let resumeContentType = "application/pdf";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = ((formData.get("name") as string) || "").trim();
      email = ((formData.get("email") as string) || "").trim();
      phone = ((formData.get("phone") as string) || "").trim();
      role = ((formData.get("role") as string) || "").trim();
      message = ((formData.get("message") as string) || "").trim();
      honeypot = ((formData.get("website_hp") as string) || "").trim();

      const file = formData.get("resume") as File | null;
      if (file && typeof file === "object" && file.size > 0) {
        resumeFile = file;
        resumeFileName = file.name;
        resumeContentType = file.type || "application/pdf";
        const arrayBuffer = await file.arrayBuffer();
        resumeBuffer = Buffer.from(arrayBuffer);
      }
    } else {
      const body = await request.json();
      name = (body.name || "").trim();
      email = (body.email || "").trim();
      phone = (body.phone || "").trim();
      role = (body.role || "").trim();
      message = (body.message || "").trim();
      honeypot = (body.website_hp || "").trim();
      resumeFileName = body.resumeName || "";
    }

    // 1. Spam protection honeypot: If filled by automated bots, reject silently
    if (honeypot) {
      console.warn(`[Security] Bot honeypot triggered by IP/submission from: ${email || "unknown"}`);
      return NextResponse.json(
        { success: true, message: "Your application has been submitted successfully." },
        { status: 200 }
      );
    }

    // 2. Strict Backend Validations
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (!role) {
      return NextResponse.json(
        { error: "Applied position role is required." },
        { status: 400 }
      );
    }

    // 3. Resume Validation (Required, max 5 MB, PDF/DOC/DOCX)
    if (!resumeBuffer || !resumeFileName) {
      return NextResponse.json(
        { error: "A resume file (PDF, DOC, or DOCX) is required." },
        { status: 400 }
      );
    }

    if (resumeBuffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume file size exceeds the 5 MB limit. Please upload a smaller file." },
        { status: 400 }
      );
    }

    const fileExt = resumeFileName.slice(resumeFileName.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json(
        { error: "Invalid resume format. Only PDF, DOC, and DOCX files are accepted." },
        { status: 400 }
      );
    }

    // 4. Save resume file to server filesystem
    const timestamp = new Date().toISOString();
    const savedFile = await saveResumeFile(resumeBuffer, resumeFileName, name);

    // 5. Save application record to database (JSON store + optional Google Sheet webhook)
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const record: JobApplicationRecord = {
      id: applicationId,
      name,
      email,
      phone,
      role,
      message,
      resumeFileName: savedFile.fileName,
      resumePath: savedFile.fullPath,
      resumeUrl: savedFile.relativeUrl,
      timestamp,
      createdAt: new Date().toUTCString()
    };

    await saveApplicationRecord(record);

    // 6. Forward application & resume to Google Sheets Webhook (logs row, saves resume to Google Drive, sends emails with zero passwords)
    sendToGoogleSheetWebhook({
      name,
      email,
      phone,
      role,
      message,
      timestamp,
      resumeFileName,
      resumeContentType,
      resumeBuffer
    }).catch((sheetErr) => {
      console.error("[GoogleSheet] Async dispatch error:", sheetErr);
    });

    // 7. Deliver email via SMTP if configured
    await sendApplicationToHR({
      name,
      email,
      phone,
      role,
      message,
      resumeFileName,
      resumeBuffer,
      resumeContentType,
      timestamp
    });

    // 8. Send automatic confirmation email to applicant via SMTP if configured
    sendConfirmationToApplicant({
      name,
      email,
      role
    }).catch((confErr) => {
      console.error("[Mailer] Non-blocking applicant confirmation email error:", confErr);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your application has been submitted successfully.",
        applicationId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Apply API] Application submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
