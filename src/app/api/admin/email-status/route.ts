import { NextResponse } from "next/server";
import { testSmtpConnection, sendTestEmail } from "@/lib/mailer";
import { getConsultationRecords, getApplicationRecords } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const shouldCheckNetwork = searchParams.get("check") === "true";
    const smtpStatus = await testSmtpConnection(!shouldCheckNetwork);
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";
    const hasWebhook = Boolean(webhookUrl && webhookUrl.startsWith("http"));
    
    const consultations = await getConsultationRecords();
    const applications = await getApplicationRecords();

    return NextResponse.json({
      success: true,
      emailSystem: {
        smtp: {
          configured: smtpStatus.configured,
          connected: smtpStatus.connected,
          provider: smtpStatus.provider || "Microsoft Office 365",
          host: smtpStatus.host || "smtp.office365.com",
          user: smtpStatus.user || "contact@techaxisglobal.com",
          error: smtpStatus.error || null
        },
        googleWebhook: {
          configured: hasWebhook,
          url: hasWebhook ? `${webhookUrl.slice(0, 35)}...` : "Not configured"
        },
        destinations: {
          contactEmail: process.env.CONTACT_EMAIL || process.env.MICROSOFT_SMTP_USER || "contact@techaxisglobal.com",
          hrEmail: process.env.HR_EMAIL || process.env.MICROSOFT_SMTP_USER || "contact@techaxisglobal.com"
        }
      },
      counts: {
        consultations: consultations.length,
        applications: applications.length
      }
    });
  } catch (error: any) {
    console.error("[Email Status API] Error checking status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to evaluate email system status" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const defaultInbox = process.env.CONTACT_EMAIL || process.env.MICROSOFT_SMTP_USER || "contact@techaxisglobal.com";
    const targetEmail = (body.email || defaultInbox).trim();

    if (!targetEmail) {
      return NextResponse.json(
        { success: false, error: "Target email address is required" },
        { status: 400 }
      );
    }

    const result = await sendTestEmail(targetEmail);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error: any) {
    console.error("[Email Test API] Error sending test email:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to trigger test email" },
      { status: 500 }
    );
  }
}
