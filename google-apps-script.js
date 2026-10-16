/**
 * =========================================================================
 * TECHAXIS GLOBAL - GOOGLE SHEETS & APPS SCRIPT CAREERS BACKEND
 * =========================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Name your spreadsheet: "TAG Careers - Job Applications"
 * 3. In the top menu, click: Extensions > Apps Script
 * 4. Delete any existing code in the script editor and PASTE THIS ENTIRE FILE.
 * 5. Update HR_EMAIL below with your destination inbox (or leave blank to use your current Gmail).
 * 6. Click the blue "Deploy" button at top right > "New deployment"
 * 7. Click the gear icon next to "Select type" > select "Web app"
 * 8. Set:
 *    - Description: "TAG Careers Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT: select "Anyone")
 * 9. Click "Deploy" > "Authorize access" (choose your Google account > Advanced > Go to Untitled (unsafe) > Allow)
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into your .env.local file as:
 *     GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/...
 * 
 * THAT'S IT! Zero passwords, zero SMTP, completely automatic!
 * =========================================================================
 */

// Put your HR destination email here (or leave as is to receive it in your own Gmail)
var HR_EMAIL = "techaxisglobal@gmail.com"; 

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "active", message: "TAG Careers Webhook is live and ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No post data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Initialize Header Row if new sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (EST)",
        "Position Applied For",
        "Candidate Name",
        "Email Address",
        "Phone Number",
        "Resume (Google Drive Link)",
        "Cover Note / Message"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#B42318");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // 2. Process Resume File & Save to Google Drive
    var resumeDriveUrl = "No file attached";
    var resumeBlob = null;

    if (data.resumeBase64) {
      var decodedBytes = Utilities.base64Decode(data.resumeBase64);
      var fileName = data.resumeFileName || "Candidate_Resume.pdf";
      var contentType = data.resumeContentType || "application/pdf";
      resumeBlob = Utilities.newBlob(decodedBytes, contentType, fileName);

      // Save into a dedicated folder named "TAG Resumes" in your Google Drive
      var folderName = "TAG Resumes";
      var folders = DriveApp.getFoldersByName(folderName);
      var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
      
      var driveFile = folder.createFile(resumeBlob);
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      resumeDriveUrl = driveFile.getUrl();
    }

    // 3. Append Candidate Record to Google Sheet
    var formattedDate = Utilities.formatDate(new Date(), "America/New_York", "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      formattedDate,
      data.role || "N/A",
      data.name || "N/A",
      data.email || "N/A",
      data.phone || "N/A",
      resumeDriveUrl,
      data.message || ""
    ]);

    // 4. Send Email Notification to HR with Resume Attached
    var destinationHR = HR_EMAIL || Session.getActiveUser().getEmail();
    var hrSubject = "New Job Application – " + (data.role || "Role") + " – " + (data.name || "Candidate");
    
    var hrHtmlBody = 
      "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E5E5EA;border-radius:16px;overflow:hidden;'>" +
        "<div style='background:#1D1D1F;padding:24px 28px;color:#ffffff;'>" +
          "<span style='background:#B42318;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700;'>TECHAXIS GLOBAL</span>" +
          "<h2 style='margin:10px 0 0;font-size:20px;'>New Application Received</h2>" +
        "</div>" +
        "<div style='padding:28px;background:#ffffff;'>" +
          "<table style='width:100%;border-collapse:collapse;font-size:14px;'>" +
            "<tr><td style='padding:8px 0;color:#6E6E73;width:140px;'>Position:</td><td style='font-weight:700;color:#B42318;'>" + data.role + "</td></tr>" +
            "<tr><td style='padding:8px 0;color:#6E6E73;'>Candidate:</td><td style='font-weight:600;'>" + data.name + "</td></tr>" +
            "<tr><td style='padding:8px 0;color:#6E6E73;'>Email:</td><td><a href='mailto:" + data.email + "'>" + data.email + "</a></td></tr>" +
            "<tr><td style='padding:8px 0;color:#6E6E73;'>Phone:</td><td>" + data.phone + "</td></tr>" +
            "<tr><td style='padding:8px 0;color:#6E6E73;'>Submitted:</td><td>" + formattedDate + " (EST)</td></tr>" +
            "<tr><td style='padding:8px 0;color:#6E6E73;'>Drive Resume:</td><td><a href='" + resumeDriveUrl + "' target='_blank'>View Resume in Google Drive</a></td></tr>" +
          "</table>" +
          "<h4 style='margin:20px 0 6px;'>Cover Note / Message:</h4>" +
          "<div style='background:#F9F9FB;padding:14px;border-radius:8px;font-size:14px;border:1px solid #EAEAEA;'>" + (data.message ? data.message : "<em>No message provided.</em>") + "</div>" +
        "</div>" +
        "<div style='padding:16px 28px;background:#FAFAFA;border-top:1px solid #EFEFEF;font-size:12px;color:#86868B;text-align:center;'>" +
          "Reply directly to this email to contact <strong>" + data.name + "</strong> (" + data.email + ")." +
        "</div>" +
      "</div>";

    var mailOptions = {
      replyTo: data.email,
      name: "TAG Careers Portal",
      htmlBody: hrHtmlBody
    };

    if (resumeBlob) {
      mailOptions.attachments = [resumeBlob];
    }

    MailApp.sendEmail(destinationHR, hrSubject, "New application received from " + data.name, mailOptions);

    // 5. Send Automatic Confirmation Email to Applicant
    if (data.email) {
      var applicantSubject = "Application Received – " + (data.role || "Role") + " | TechAxis Global";
      var applicantHtml = 
        "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;border:1px solid #E5E5EA;border-radius:16px;overflow:hidden;'>" +
          "<div style='background:#1D1D1F;padding:24px 28px;color:#ffffff;text-align:center;'>" +
            "<h2 style='margin:0;font-size:22px;'>TechAxis Global</h2>" +
            "<p style='margin:4px 0 0;color:#A1A1A6;font-size:13px;'>Application Confirmation</p>" +
          "</div>" +
          "<div style='padding:28px;background:#ffffff;'>" +
            "<h3 style='margin-top:0;'>Thank You, " + data.name + "!</h3>" +
            "<p style='color:#333;font-size:15px;line-height:1.6;'>Thank you for applying for <strong>" + data.role + "</strong>. Our team has received your application and will contact you if your profile matches.</p>" +
            "<p style='color:#666;font-size:14px;margin-top:24px;'>Warm regards,<br /><strong>Talent Acquisition Team</strong><br />TechAxis Global LLC</p>" +
          "</div>" +
          "<div style='padding:14px;background:#FAFAFA;border-top:1px solid #EFEFEF;font-size:11px;color:#86868B;text-align:center;'>" +
            "© " + new Date().getFullYear() + " TechAxis Global LLC. All rights reserved." +
          "</div>" +
        "</div>";

      MailApp.sendEmail(data.email, applicantSubject, "Thank you for applying for " + data.role + ". Our team has received your application and will contact you if your profile matches.", {
        name: "TechAxis Global Careers",
        htmlBody: applicantHtml
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Application recorded and emails sent successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
