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
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
}

/**
 * 1. Sends the full application + attached resume to HR
 */
export async function sendApplicationToHR(params: SendApplicationEmailParams): Promise<{ sent: boolean; simulated?: boolean }> {
  const { name, email, phone, role, message, resumeFileName, resumeBuffer, resumeContentType, timestamp } = params;
  
  const hrEmail = process.env.HR_EMAIL || "careers@techaxisglobal.com";
  const fromEmail = process.env.SMTP_FROM || `"TAG Careers Portal" <${hrEmail}>`;
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

  const hrEmail = process.env.HR_EMAIL || "careers@techaxisglobal.com";
  const fromEmail = process.env.SMTP_FROM || `"TechAxis Global Careers" <${hrEmail}>`;
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
