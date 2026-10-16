export interface GoogleSheetPayload {
  name: string;
  email: string;
  phone: string;
  role: string;
  message?: string;
  timestamp: string;
  resumeFileName: string;
  resumeContentType?: string;
  resumeBuffer?: Buffer;
}

const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwl4fLF5F78XVqHsyFkawT3ACzCnczyXeMXga1tW-eSYMhkLuDcTK1zGOVwa_K1GLQ/exec";

/**
 * Forwards application and resume to Google Apps Script Webhook
 * Which saves to Google Sheet, Google Drive, and sends emails automatically
 */
export async function sendToGoogleSheetWebhook(payload: GoogleSheetPayload): Promise<{ success: boolean; message?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return { success: false, message: "GOOGLE_SHEET_WEBHOOK_URL not configured" };
  }

  try {
    const body: Record<string, any> = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      message: payload.message || "",
      timestamp: payload.timestamp,
      resumeFileName: payload.resumeFileName,
      resumeContentType: payload.resumeContentType || "application/pdf"
    };

    if (payload.resumeBuffer && payload.resumeBuffer.length > 0) {
      body.resumeBase64 = payload.resumeBuffer.toString("base64");
    }

    // Google Apps Script accepts text/plain natively and follows redirects
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(body),
      redirect: "follow"
    });

    const responseText = await response.text();
    console.log(`[GoogleSheet Webhook] Response status: ${response.status}, body: ${responseText.slice(0, 150)}`);

    return { success: true };
  } catch (error: any) {
    console.error("[GoogleSheet Webhook] Failed to dispatch to Google Sheet webhook:", error);
    return { success: false, message: error.message };
  }
}
