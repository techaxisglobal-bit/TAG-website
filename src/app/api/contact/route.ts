import { NextResponse } from "next/server";
import { sendContactInquiryToTAG, sendConsultationConfirmationToUser } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const company = (body.company || "").trim();
    const phone = (body.phone || "").trim();
    const service = (body.service || "General IT Consulting").trim();
    const message = (body.message || "").trim();
    const honeypot = (body.website_hp || body.honeypot || "").trim();

    // 1. Bot spam protection: Silent return if honeypot filled
    if (honeypot) {
      console.warn(`[Contact API] Bot honeypot triggered: ${email || "unknown"}`);
      return NextResponse.json(
        { success: true, message: "Thank you for reaching out. We have received your inquiry." },
        { status: 200 }
      );
    }

    // 2. Strict Validations
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (!company || company.length < 2) {
      return NextResponse.json(
        { error: "Please specify your company or organization name." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please provide brief details about your inquiry (at least 10 characters)." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    const emailParams = {
      name,
      email,
      company,
      phone,
      service,
      message,
      timestamp
    };

    // 3. Dispatch Emails concurrently:
    // a) Notification to TAG team (contact@techaxisglobal.com)
    // b) Thank you confirmation to client
    const [tagEmailResult, clientEmailResult] = await Promise.allSettled([
      sendContactInquiryToTAG(emailParams),
      sendConsultationConfirmationToUser(emailParams)
    ]);

    if (tagEmailResult.status === "rejected") {
      console.error("[Contact API] Error sending inquiry to TAG team:", tagEmailResult.reason);
    }

    if (clientEmailResult.status === "rejected") {
      console.error("[Contact API] Error sending confirmation to client:", clientEmailResult.reason);
    }

    // 4. Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for consulting with TechAxis Global! Your message has been received, and a confirmation email has been sent to your inbox. An enterprise architect will be in touch shortly.",
      data: {
        name,
        company,
        service,
        timestamp
      }
    });

  } catch (err: any) {
    console.error("[Contact API] Uncaught handler error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry. Please try again or email us directly at contact@techaxisglobal.com." },
      { status: 500 }
    );
  }
}
