import nodemailer from "nodemailer";

interface SendApplicationEmailParams {
  name: string;
  email: string;
  phone: string;
  role: string;
  message?: string;
  resumeFileName: string;
  resumeBuffer?: Buffer;
  resumeContentType?: string;
  timestamp: string;
}

function getMailTransporter() {
  const host = (process.env.MICROSOFT_SMTP_HOST || process.env.SMTP_HOST || "").trim();
  const user = (process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "").trim();
  const pass = (process.env.MICROSOFT_SMTP_PASS || process.env.SMTP_PASS || "").trim();
  const port = parseInt(process.env.MICROSOFT_SMTP_PORT || process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  const cleanPass = pass.replace(/\s+/g, "");
  const lowerHost = host.toLowerCase();

  // Microsoft 365 / Office 365 / Outlook (port 587 with STARTTLS)
  if (lowerHost.includes("office365") || lowerHost.includes("outlook") || lowerHost.includes("microsoft")) {
    return nodemailer.createTransport({
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      host: host || "smtp.office365.com",
      port: port || 587,
      secure: false, // Office 365 requires STARTTLS
      requireTLS: true,
      auth: {
        user,
        pass: cleanPass
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false
      }
    });
  }

  // Gmail preset
  if (lowerHost.includes("gmail")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass: cleanPass
      }
    });
  }

  // Standard SMTP
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass: cleanPass
    }
  });
}

interface SmtpTestResult {
  configured: boolean;
  connected: boolean;
  error?: string;
  host?: string;
  user?: string;
  provider?: string;
}

let cachedSmtpStatus: { result: SmtpTestResult; timestamp: number } | null = null;

/**
 * Diagnostic helper to verify whether SMTP is currently configured and successfully connected
 */
export async function testSmtpConnection(skipNetworkCheck: boolean = false): Promise<SmtpTestResult> {
  const host = (process.env.MICROSOFT_SMTP_HOST || process.env.SMTP_HOST || "").trim();
  const user = (process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "").trim();
  const pass = (process.env.MICROSOFT_SMTP_PASS || process.env.SMTP_PASS || "").trim();

  const isMicrosoft = host.toLowerCase().includes("office365") || host.toLowerCase().includes("outlook") || host.toLowerCase().includes("microsoft");
  const provider = isMicrosoft ? "Microsoft Office 365" : host.toLowerCase().includes("gmail") ? "Google Workspace / Gmail" : "Custom SMTP";

  if (!host && !user) {
    return {
      configured: false,
      connected: false,
      error: "SMTP credentials are not configured in environment variables.",
      host: "Not set",
      user: "Not set",
      provider
    };
  }

  if (!pass) {
    return {
      configured: false,
      connected: false,
      error: `${provider} host (${host || "smtp.office365.com"}) and user (${user}) are set, but password (MICROSOFT_SMTP_PASS or SMTP_PASS) is empty in .env.local. Add your password to send live emails.`,
      host: host || "smtp.office365.com",
      user: user || "Not set",
      provider
    };
  }

  // Instant mode: return configuration immediately without blocking on a network TCP handshake
  if (skipNetworkCheck) {
    if (cachedSmtpStatus && Date.now() - cachedSmtpStatus.timestamp < 120000) {
      return cachedSmtpStatus.result;
    }
    return {
      configured: true,
      connected: true,
      host: host || "smtp.office365.com",
      user: user || "contact@techaxisglobal.com",
      provider
    };
  }

  // Use cached result if tested within the last 60 seconds
  if (cachedSmtpStatus && Date.now() - cachedSmtpStatus.timestamp < 60000) {
    return cachedSmtpStatus.result;
  }

  const transporter = getMailTransporter();
  if (!transporter) {
    return {
      configured: false,
      connected: false,
      error: "Failed to initialize mail transporter.",
      host,
      user,
      provider
    };
  }

  try {
    // 3-second strict timeout to prevent any page lag or hang
    const verifyPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("SMTP verification timed out after 3 seconds")), 3000)
    );

    await Promise.race([verifyPromise, timeoutPromise]);
    const res: SmtpTestResult = { configured: true, connected: true, host, user, provider };
    cachedSmtpStatus = { result: res, timestamp: Date.now() };
    return res;
  } catch (err: any) {
    let errorMsg = err.message || "Failed to authenticate with SMTP server. Check credentials.";
    if (errorMsg.includes("535 5.7.3")) {
      errorMsg = "Microsoft 365 Error 535 5.7.3: Login was rejected by Microsoft. In your Microsoft 365 Admin Center (admin.microsoft.com), go to Users > Active users > contact@techaxisglobal.com > Mail tab > Manage email apps > check 'Authenticated SMTP'. If 2FA is active on this account, create an App Password at mysignins.microsoft.com/security-info.";
    }

    const res: SmtpTestResult = {
      configured: true,
      connected: false,
      host,
      user,
      provider,
      error: errorMsg
    };
    cachedSmtpStatus = { result: res, timestamp: Date.now() };
    return res;
  }
}

/**
 * Sends a test email to verify live delivery
 */
export async function sendTestEmail(targetEmail: string): Promise<{ success: boolean; message: string }> {
  const transporter = getMailTransporter();
  const authUser = process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "contact@techaxisglobal.com";

  if (!transporter) {
    return {
      success: false,
      message: `Cannot send test email: SMTP password is empty. Set MICROSOFT_SMTP_PASS in .env.local to send emails with ${authUser}.`
    };
  }

  const fromEmail = process.env.SMTP_FROM || `"TechAxis Global" <${authUser}>`;

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: targetEmail,
      subject: "TechAxis Global – Microsoft 365 SMTP Test Email [Successful]",
      text: "Congratulations! Your Microsoft 365 email system is properly configured and successfully delivering messages from TechAxis Global.",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; margin: 20px auto;">
          <h2 style="color: #0F172A; margin-top: 0;">Microsoft 365 Email Operational</h2>
          <p style="color: #334155; line-height: 1.5;">This test message confirms that your Microsoft Office 365 SMTP mailer (${authUser}) is fully functioning and capable of delivering client consultation and job application notifications to inboxes.</p>
          <div style="background: #F1F5F9; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #475569;">
            <strong>Authenticated User:</strong> ${authUser}<br/>
            <strong>Delivered At:</strong> ${new Date().toUTCString()}
          </div>
          <p style="color: #64748B; font-size: 12px; margin-top: 20px;">TechAxis Global • Automated System Check</p>
        </div>
      `
    });
    return { success: true, message: `Test email successfully sent to ${targetEmail} via Microsoft 365!` };
  } catch (err: any) {
    let msg = err.message || String(err);
    if (msg.includes("535 5.7.3")) {
      msg = "Microsoft 365 Error 535 (Authentication unsuccessful): In your Microsoft 365 Admin Center, enable 'Authenticated SMTP' for contact@techaxisglobal.com (Users > Active users > contact@techaxisglobal.com > Mail > Manage email apps > check 'Authenticated SMTP'). If 2FA is active, generate a Microsoft App Password.";
    }
    return { success: false, message: `Email failed to send: ${msg}` };
  }
}

/**
 * 1. Sends the full application + attached resume to HR
 */
export async function sendApplicationToHR(params: SendApplicationEmailParams): Promise<{ sent: boolean; simulated?: boolean }> {
  const { name, email, phone, role, message, resumeFileName, resumeBuffer, resumeContentType, timestamp } = params;
  
  const defaultMailUser = process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "contact@techaxisglobal.com";
  const hrEmail = process.env.HR_EMAIL || defaultMailUser;
  const fromEmail = process.env.SMTP_FROM || `"TAG Careers Portal" <${defaultMailUser}>`;
  const subject = `New Job Application – ${role} – ${name}`;

  const formattedDate = new Date(timestamp).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "medium"
  });

  const textBody = `
==================================================
NEW JOB APPLICATION RECEIVED
==================================================

Position Applied For: ${role}
Applicant Name:       ${name}
Email Address:        ${email}
Phone Number:         ${phone}
Submission Date/Time: ${formattedDate} (EST)
Resume Attached:      ${resumeFileName}

Cover Note / Message:
${message ? message : "(No additional message provided)"}

==================================================
To reply directly to this candidate, simply hit 'Reply' in your email client.
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F5F7; margin: 0; padding: 24px; color: #1D1D1F; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #1D1D1F; padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; font-size: 14px; color: #A1A1A6; }
    .badge { display: inline-block; background: #B42318; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; rounded: 6px; border-radius: 6px; margin-bottom: 8px; }
    .content { padding: 32px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .field-table td { padding: 10px 0; border-bottom: 1px solid #F0F0F2; font-size: 14px; }
    .field-table .label { color: #6E6E73; width: 140px; font-weight: 500; }
    .field-table .value { color: #1D1D1F; font-weight: 600; }
    .message-box { background: #F9F9FB; border-radius: 12px; padding: 18px 20px; border: 1px solid #E5E5EA; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #333336; white-space: pre-wrap; }
    .footer { padding: 20px 32px; background: #FAFAFA; border-top: 1px solid #EFEFEF; font-size: 12px; color: #86868B; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">TechAxis Global Careers</div>
      <h1>New Application Received</h1>
      <p>Submitted for <strong>${role}</strong></p>
    </div>
    <div class="content">
      <table class="field-table">
        <tr>
          <td class="label">Position</td>
          <td class="value" style="color: #B42318;">${role}</td>
        </tr>
        <tr>
          <td class="label">Candidate Name</td>
          <td class="value">${name}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${email}" style="color: #B42318; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${phone}" style="color: #1D1D1F; text-decoration: none;">${phone}</a></td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${formattedDate} (EST)</td>
        </tr>
        <tr>
          <td class="label">Resume Attachment</td>
          <td class="value">📄 ${resumeFileName}</td>
        </tr>
      </table>

      <h3 style="font-size: 14px; color: #1D1D1F; margin: 20px 0 6px;">Cover Note / Additional Information:</h3>
      <div class="message-box">${message ? message : "<em>No additional message provided.</em>"}</div>
    </div>
    <div class="footer">
      This notification was generated automatically by the TechAxis Global website.<br />
      Reply directly to this email to contact <strong>${name}</strong> (${email}).
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getMailTransporter();

  if (!transporter) {
    console.log("[Mailer: Simulated HR Delivery] No SMTP credentials in .env.local; application logged:");
    console.log(` -> To: ${hrEmail}`);
    console.log(` -> Subject: ${subject}`);
    console.log(` -> Reply-To: ${email}`);
    console.log(` -> Resume attached: ${resumeFileName} (${resumeBuffer ? `${resumeBuffer.length} bytes` : "0 bytes"})`);
    return { sent: true, simulated: true };
  }

  const attachments: any[] = [];
  if (resumeBuffer && resumeBuffer.length > 0) {
    attachments.push({
      filename: resumeFileName,
      content: resumeBuffer,
      contentType: resumeContentType || "application/pdf"
    });
  }

  await transporter.sendMail({
    from: fromEmail,
    to: hrEmail,
    replyTo: email,
    subject,
    text: textBody,
    html: htmlBody,
    attachments
  });

  console.log(`[Mailer] HR application email dispatched to ${hrEmail} for ${name} (${role})`);
  return { sent: true, simulated: false };
}

/**
 * 2. Sends automatic confirmation receipt to the applicant
 */
export async function sendConfirmationToApplicant(params: {
  name: string;
  email: string;
  role: string;
}): Promise<{ sent: boolean; simulated?: boolean }> {
  const { name, email, role } = params;

  const defaultMailUser = process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "contact@techaxisglobal.com";
  const hrEmail = process.env.HR_EMAIL || defaultMailUser;
  const fromEmail = process.env.SMTP_FROM || `"TechAxis Global Careers" <${defaultMailUser}>`;
  const subject = `Application Received – ${role} | TechAxis Global`;

  const textBody = `
Dear ${name},

Thank you for applying for the ${role} position at TechAxis Global. Our team has received your application and will contact you if your profile matches our requirements.

We appreciate your interest in joining TechAxis Global and look forward to learning more about your background.

Best regards,
Talent Acquisition Team
TechAxis Global LLC
${hrEmail}
https://techaxisglobal.com
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F5F7; margin: 0; padding: 24px; color: #1D1D1F; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #1D1D1F; padding: 28px 32px; color: #ffffff; text-align: center; }
    .content { padding: 32px; }
    h2 { font-size: 20px; font-weight: 700; margin-top: 0; color: #1D1D1F; }
    p { font-size: 15px; line-height: 1.6; color: #424245; margin: 14px 0; }
    .highlight-card { background: #F9F9FB; border-radius: 12px; padding: 16px 20px; border-left: 4px solid #B42318; margin: 20px 0; }
    .footer { padding: 20px 32px; background: #FAFAFA; border-top: 1px solid #EFEFEF; font-size: 12px; color: #86868B; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">TechAxis Global</h1>
      <p style="margin: 4px 0 0; font-size: 13px; color: #A1A1A6;">Application Confirmation</p>
    </div>
    <div class="content">
      <h2>Thank You, ${name}!</h2>
      <p>
        We have successfully received your application for the following opening:
      </p>
      
      <div class="highlight-card">
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #B42318; letter-spacing: 0.04em;">Applied Position</div>
        <div style="font-size: 18px; font-weight: 700; color: #1D1D1F; margin-top: 2px;">${role}</div>
      </div>

      <p>
        Our talent acquisition and engineering leads review every submission carefully. If your background aligns with the requirements of this role, a member of our team will contact you directly to schedule an introductory conversation.
      </p>

      <p style="margin-top: 24px;">
        Warm regards,<br />
        <strong>Talent Acquisition Team</strong><br />
        TechAxis Global LLC<br />
        <a href="mailto:${hrEmail}" style="color: #B42318; text-decoration: none;">${hrEmail}</a>
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} TechAxis Global LLC. All rights reserved.
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getMailTransporter();

  if (!transporter) {
    console.log(`[Mailer: Simulated Applicant Confirmation] Sent confirmation receipt to candidate: ${email} for ${role}`);
    return { sent: true, simulated: true };
  }

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject,
    text: textBody,
    html: htmlBody
  });

  console.log(`[Mailer] Confirmation email sent to applicant ${email} for ${role}`);
  return { sent: true, simulated: false };
}

export interface SendContactEmailParams {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
  timestamp: string;
}

/**
 * 3. Sends incoming client consultation inquiry to TAG team
 */
export async function sendContactInquiryToTAG(params: SendContactEmailParams): Promise<{ sent: boolean; simulated?: boolean }> {
  const { name, email, company, phone, service, message, timestamp } = params;

  const defaultMailUser = process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "contact@techaxisglobal.com";
  const contactEmail = process.env.CONTACT_EMAIL || defaultMailUser;
  const fromEmail = process.env.SMTP_FROM || `"TechAxis Global Inquiries" <${defaultMailUser}>`;
  const subject = `New Consultation Request: ${service} – ${name} (${company})`;

  const formattedDate = new Date(timestamp).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "medium"
  });

  const textBody = `
==================================================
NEW CONSULTATION INQUIRY RECEIVED
==================================================

Client Name:         ${name}
Work Email:          ${email}
Company:             ${company}
Phone Number:        ${phone || "Not provided"}
Service of Interest: ${service}
Submission Time:     ${formattedDate} (EST)

Client Message:
${message}

==================================================
To reply directly to ${name}, click 'Reply' in your email client.
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #1D1D1F; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: #0F172A; padding: 28px 32px; color: #ffffff; border-bottom: 3px solid #B42318; }
    .badge { display: inline-block; background: #B42318; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 6px; margin-bottom: 10px; }
    .header h1 { margin: 0; font-size: 21px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; font-size: 13.5px; color: #94A3B8; }
    .content { padding: 32px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .field-table td { padding: 11px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
    .field-table .label { color: #64748B; width: 150px; font-weight: 500; }
    .field-table .value { color: #0F172A; font-weight: 600; }
    .message-box { background: #F8FAFC; border-radius: 12px; padding: 18px 20px; border-left: 4px solid #B42318; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; margin-top: 10px; }
    .footer { padding: 20px 32px; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">TechAxis Global • Consultation Request</div>
      <h1>New Client Inquiry Received</h1>
      <p>Submitted via techaxisglobal.com/contact-us</p>
    </div>
    <div class="content">
      <table class="field-table">
        <tr>
          <td class="label">Service Focus</td>
          <td class="value" style="color: #B42318;">${service}</td>
        </tr>
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${name}</td>
        </tr>
        <tr>
          <td class="label">Company / Organization</td>
          <td class="value">${company}</td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #B42318; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value">${phone ? `<a href="tel:${phone}" style="color: #0F172A; text-decoration: none;">${phone}</a>` : "<em>Not provided</em>"}</td>
        </tr>
        <tr>
          <td class="label">Submission Date</td>
          <td class="value">${formattedDate} (EST)</td>
        </tr>
      </table>

      <h3 style="font-size: 14px; color: #0F172A; margin: 24px 0 6px;">Client Message & Objectives:</h3>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      This notification was generated automatically by the TechAxis Global website.<br />
      Reply directly to this email to respond to <strong>${name}</strong> at <strong>${email}</strong>.
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getMailTransporter();

  if (!transporter) {
    console.log("[Mailer: Simulated Contact Inquiry] No SMTP credentials in .env.local; message logged:");
    console.log(` -> To: ${contactEmail}`);
    console.log(` -> Subject: ${subject}`);
    console.log(` -> Client: ${name} (${email}) - ${company}`);
    console.log(` -> Service: ${service}`);
    console.log(` -> Message: ${message}`);
    return { sent: true, simulated: true };
  }

  await transporter.sendMail({
    from: fromEmail,
    to: contactEmail,
    replyTo: email,
    subject,
    text: textBody,
    html: htmlBody
  });

  console.log(`[Mailer] Contact inquiry dispatched to ${contactEmail} for ${name} (${company})`);
  return { sent: true, simulated: false };
}

/**
 * 4. Sends polite "Thank you for consulting / contacting" confirmation to the client
 */
export async function sendConsultationConfirmationToUser(params: SendContactEmailParams): Promise<{ sent: boolean; simulated?: boolean }> {
  const { name, email, company, service, phone } = params;

  const defaultMailUser = process.env.MICROSOFT_SMTP_USER || process.env.SMTP_USER || "contact@techaxisglobal.com";
  const contactEmail = process.env.CONTACT_EMAIL || defaultMailUser;
  const fromEmail = process.env.SMTP_FROM || `"TechAxis Global" <${defaultMailUser}>`;
  const subject = `Thank You for Contacting TechAxis Global – Consultation Request Received`;

  const textBody = `
Dear ${name},

Thank you for reaching out to TechAxis Global LLC.

We have received your consultation inquiry regarding "${service}" for ${company}. One of our principal solution architects is currently reviewing your project details and requirements.

What Happens Next:
1. Architectural Review: Our technical leads analyze your submission to align our domain expertise.
2. Prompt Response: We will reach out to you within 24 hours (Monday–Friday, 9:00 AM – 6:00 PM EST).
3. Complimentary Architecture Discussion: We will schedule a focused consultation to discuss your milestones, timeline, and deliverables.

Inquiry Summary:
- Service Area: ${service}
- Company: ${company}
- Contact Email: ${email}
${phone ? `- Contact Phone: ${phone}` : ""}

If you have urgent inquiries, feel free to call our US headquarters directly at +1 434-285-4949.

Warm regards,
Enterprise Solutions Team
TechAxis Global LLC
8401 Mayland Dr, Ste S, Richmond, VA 23294, USA
contact@techaxisglobal.com | https://techaxisglobal.com
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 28px 16px; color: #1E293B; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid rgba(0,0,0,0.07); box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 36px 36px 30px; color: #ffffff; text-align: left; border-bottom: 3px solid #B42318; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; font-size: 14px; color: #CBD5E1; }
    .content { padding: 36px; }
    .lead { font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .summary-card { background: #F8FAFC; border-radius: 14px; padding: 20px 24px; border: 1px solid #E2E8F0; margin: 24px 0; }
    .summary-row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px; border-bottom: 1px solid #EDF2F7; }
    .summary-row:last-child { border-bottom: none; }
    .summary-label { color: #64748B; font-weight: 500; }
    .summary-val { color: #0F172A; font-weight: 600; text-align: right; }
    .next-steps { background: #FFFBF5; border: 1px solid #FED7AA; border-radius: 14px; padding: 20px 24px; margin: 28px 0; }
    .next-step-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: 13.5px; color: #7C2D12; }
    .next-step-item:last-child { margin-bottom: 0; }
    .step-number { background: #D97706; color: #ffffff; font-size: 11px; font-weight: 700; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .footer { padding: 24px 36px; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 12.5px; color: #64748B; line-height: 1.6; }
    .cta-btn { display: inline-block; background: #B42318; color: #ffffff !important; text-decoration: none; font-size: 13.5px; font-weight: 600; padding: 10px 22px; border-radius: 9999px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #D97706; margin-bottom: 8px;">
        Consultation Request Received
      </div>
      <h1>Thank You, ${name}!</h1>
      <p>We've received your inquiry and our team is already reviewing it.</p>
    </div>

    <div class="content">
      <p class="lead">
        Thank you for contacting <strong>TechAxis Global</strong> regarding enterprise IT solutions for <strong>${company}</strong>. We appreciate the opportunity to collaborate.
      </p>

      <div class="summary-card">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #B42318; letter-spacing: 0.05em; margin-bottom: 12px;">
          Inquiry Overview
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Service Area:</td>
            <td style="padding: 6px 0; color: #0F172A; font-weight: 600; text-align: right;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Company:</td>
            <td style="padding: 6px 0; color: #0F172A; font-weight: 600; text-align: right;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Work Email:</td>
            <td style="padding: 6px 0; color: #0F172A; font-weight: 600; text-align: right;">${email}</td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Phone:</td>
            <td style="padding: 6px 0; color: #0F172A; font-weight: 600; text-align: right;">${phone}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      <div class="next-steps">
        <div style="font-size: 12.5px; font-weight: 700; text-transform: uppercase; color: #9A3412; letter-spacing: 0.05em; margin-bottom: 12px;">
          What Happens Next
        </div>
        <div class="next-step-item">
          <div class="step-number">1</div>
          <div><strong>Requirement Review:</strong> A principal enterprise solutions architect is reviewing your inquiry.</div>
        </div>
        <div class="next-step-item">
          <div class="step-number">2</div>
          <div><strong>Direct Follow-up:</strong> You will receive a direct reply or call within 24 hours (Mon–Fri, 9am–6pm EST).</div>
        </div>
        <div class="next-step-item">
          <div class="step-number">3</div>
          <div><strong>Architecture Consultation:</strong> We will schedule a dedicated discovery session to outline technical strategies and timelines.</div>
        </div>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Need immediate assistance? You can reach our US headquarters team directly at <a href="tel:+14342854949" style="color: #B42318; font-weight: 600; text-decoration: none;">+1 434-285-4949</a>.
      </p>

      <p style="margin-top: 28px; font-size: 14px; line-height: 1.6; color: #334155;">
        Warm regards,<br />
        <strong>Enterprise Solutions Team</strong><br />
        TechAxis Global LLC<br />
        <a href="https://techaxisglobal.com" style="color: #B42318; text-decoration: none;">techaxisglobal.com</a>
      </p>
    </div>

    <div class="footer">
      <strong>TechAxis Global LLC (TAG)</strong><br />
      8401 Mayland Dr, Ste S, Richmond, VA 23294, USA<br />
      © ${new Date().getFullYear()} TechAxis Global LLC. All rights reserved.
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getMailTransporter();

  if (!transporter) {
    console.log(`[Mailer: Simulated Consultation Confirmation] Sent thank you email to client: ${email} for ${service}`);
    return { sent: true, simulated: true };
  }

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    replyTo: contactEmail,
    subject,
    text: textBody,
    html: htmlBody
  });

  console.log(`[Mailer] Thank you confirmation email sent to ${email} (${company})`);
  return { sent: true, simulated: false };
}

