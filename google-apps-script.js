/**
 * =========================================================================
 * TECHAXIS GLOBAL - UNIFIED GOOGLE APPS SCRIPT BACKEND
 * (Handles BOTH Client Consultations & Job Applications)
 * =========================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Name your spreadsheet: "TechAxis Global - Inquiries & Careers"
 * 3. In the top menu, click: Extensions > Apps Script
 * 4. Delete any existing code in the script editor and PASTE THIS ENTIRE FILE.
 * 5. Update TAG_INBOX below with your destination inbox (default: techaxisglobal@gmail.com).
 * 6. Click the blue "Deploy" button at top right > "New deployment"
 * 7. Click the gear icon next to "Select type" > select "Web app"
 * 8. Set:
 *    - Description: "TAG Unified Inquiries & Careers Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT: select "Anyone")
 * 9. Click "Deploy" > "Authorize access" (choose your Google account > Advanced > Go to Untitled (unsafe) > Allow)
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into your .env.local file as:
 *     GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/...
 * 
 * THAT'S IT! Zero passwords, zero SMTP, completely automatic!
 * Both Consultations and Careers will save to dedicated tabs and send emails!
 * =========================================================================
 */

// Your destination inbox where all consultation inquiries and job applications arrive:
var TAG_INBOX = "techaxisglobal@gmail.com"; 

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "TechAxis Global unified webhook is active and listening for inquiries and applications."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No post data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // =====================================================================
    // 1. CLIENT CONSULTATION INQUIRY (from /contact-us)
    // =====================================================================
    if (data.type === "contact") {
      var consultSheet = spreadsheet.getSheetByName("Consultations");
      if (!consultSheet) {
        consultSheet = spreadsheet.insertSheet("Consultations");
      }

      // Initialize Header Row if new sheet
      if (consultSheet.getLastRow() === 0) {
        consultSheet.appendRow([
          "Timestamp (EST)",
          "Client Name",
          "Company",
          "Work Email",
          "Phone Number",
          "Service of Interest",
          "Client Message"
        ]);
        var cHeader = consultSheet.getRange(1, 1, 1, 7);
        cHeader.setFontWeight("bold");
        cHeader.setBackground("#0F172A");
        cHeader.setFontColor("#FFFFFF");
        consultSheet.setFrozenRows(1);
      }

      var formattedTime = Utilities.formatDate(new Date(), "America/New_York", "yyyy-MM-dd HH:mm:ss");
      var newConsultRow = [
        formattedTime,
        data.name || "N/A",
        data.company || "N/A",
        data.email || "N/A",
        data.phone || "Not provided",
        data.service || "General IT Consulting",
        data.message || ""
      ];

      if (consultSheet.getLastRow() <= 1) {
        consultSheet.appendRow(newConsultRow);
      } else {
        consultSheet.insertRowBefore(2);
        consultSheet.getRange(2, 1, 1, 7).setValues([newConsultRow]);
      }

      var destEmail = TAG_INBOX || Session.getActiveUser().getEmail();

      // a) Send Email Notification to TechAxis Global Team
      var teamSubject = "New Consultation Request: " + (data.service || "IT Consulting") + " – " + (data.name || "Client") + " (" + (data.company || "Company") + ")";
      var teamHtml = 
        "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:620px;margin:0 auto;border:1px solid #E2E8F0;border-radius:14px;overflow:hidden;'>" +
          "<div style='background:#0F172A;padding:24px 28px;color:#ffffff;border-bottom:3px solid #B42318;'>" +
            "<span style='background:#B42318;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700;'>TECHAXIS GLOBAL • CONSULTATION</span>" +
            "<h2 style='margin:10px 0 0;font-size:20px;'>New Client Inquiry Received</h2>" +
          "</div>" +
          "<div style='padding:28px;background:#ffffff;'>" +
            "<table style='width:100%;border-collapse:collapse;font-size:14px;'>" +
              "<tr><td style='padding:8px 0;color:#64748B;width:140px;'>Service Focus:</td><td style='font-weight:700;color:#B42318;'>" + (data.service || "IT Consulting") + "</td></tr>" +
              "<tr><td style='padding:8px 0;color:#64748B;'>Client Name:</td><td style='font-weight:600;'>" + data.name + "</td></tr>" +
              "<tr><td style='padding:8px 0;color:#64748B;'>Company:</td><td style='font-weight:600;'>" + data.company + "</td></tr>" +
              "<tr><td style='padding:8px 0;color:#64748B;'>Work Email:</td><td><a href='mailto:" + data.email + "'>" + data.email + "</a></td></tr>" +
              "<tr><td style='padding:8px 0;color:#64748B;'>Phone:</td><td>" + (data.phone || "Not provided") + "</td></tr>" +
              "<tr><td style='padding:8px 0;color:#64748B;'>Submitted:</td><td>" + formattedTime + " (EST)</td></tr>" +
            "</table>" +
            "<h4 style='margin:20px 0 6px;'>Client Message & Scope:</h4>" +
            "<div style='background:#F8FAFC;padding:16px;border-radius:8px;font-size:14px;border:1px solid #E2E8F0;border-left:4px solid #B42318;line-height:1.6;'>" + (data.message || "<em>No message provided.</em>") + "</div>" +
          "</div>" +
          "<div style='padding:16px 28px;background:#F8FAFC;border-top:1px solid #E2E8F0;font-size:12px;color:#64748B;text-align:center;'>" +
            "Reply directly to this email to contact <strong>" + data.name + "</strong> (" + data.email + ")." +
          "</div>" +
        "</div>";

      MailApp.sendEmail(destEmail, teamSubject, "New consultation from " + data.name + " (" + data.company + ")", {
        replyTo: data.email,
        name: "TechAxis Global Inquiries",
        htmlBody: teamHtml
      });

      // b) Send Thank You Confirmation Email to Client
      if (data.email) {
        var clientSubject = "Thank You for Contacting TechAxis Global – Consultation Request Received";
        var clientHtml = 
          "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:580px;margin:0 auto;border:1px solid #E2E8F0;border-radius:14px;overflow:hidden;'>" +
            "<div style='background:#0F172A;padding:28px 32px;color:#ffffff;border-bottom:3px solid #B42318;'>" +
              "<div style='color:#D97706;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;'>TechAxis Global LLC</div>" +
              "<h2 style='margin:8px 0 0;font-size:22px;'>Thank You, " + data.name + "!</h2>" +
              "<p style='margin:4px 0 0;color:#94A3B8;font-size:13.5px;'>Your consultation inquiry has been received.</p>" +
            "</div>" +
            "<div style='padding:28px 32px;background:#ffffff;'>" +
              "<p style='color:#334155;font-size:15px;line-height:1.6;margin-top:0;'>Thank you for reaching out to <strong>TechAxis Global</strong> regarding enterprise IT solutions for <strong>" + data.company + "</strong>.</p>" +
              "<div style='background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:16px 20px;margin:20px 0;'>" +
                "<div style='font-size:11px;font-weight:700;color:#B42318;text-transform:uppercase;margin-bottom:8px;'>Inquiry Details</div>" +
                "<div style='font-size:13.5px;color:#1E293B;line-height:1.6;'>" +
                  "<strong>Service Focus:</strong> " + (data.service || "IT Consulting") + "<br/>" +
                  "<strong>Company:</strong> " + data.company + "<br/>" +
                  "<strong>Email:</strong> " + data.email + "<br/>" +
                  (data.phone ? "<strong>Phone:</strong> " + data.phone + "<br/>" : "") +
                "</div>" +
              "</div>" +
              "<div style='background:#FFFBF5;border:1px solid #FED7AA;border-radius:10px;padding:16px 20px;margin:20px 0;'>" +
                "<div style='font-size:11px;font-weight:700;color:#9A3412;text-transform:uppercase;margin-bottom:6px;'>Next Steps</div>" +
                "<p style='font-size:13px;color:#7C2D12;line-height:1.5;margin:0;'>An enterprise solutions architect is reviewing your inquiry and will reach out within 24 hours to schedule an introductory discussion.</p>" +
              "</div>" +
              "<p style='color:#64748B;font-size:13.5px;margin-top:24px;line-height:1.6;'>" +
                "Warm regards,<br/>" +
                "<strong>Enterprise Solutions Team</strong><br/>" +
                "TechAxis Global LLC<br/>" +
                "<a href='https://techaxisglobal.com' style='color:#B42318;'>techaxisglobal.com</a>" +
              "</p>" +
            "</div>" +
            "<div style='padding:16px 32px;background:#F8FAFC;border-top:1px solid #E2E8F0;font-size:11.5px;color:#64748B;text-align:center;'>" +
              "8401 Mayland Dr, Ste S, Richmond, VA 23294, USA • +1 434-285-4949" +
            "</div>" +
          "</div>";

        MailApp.sendEmail(data.email, clientSubject, "Thank you for reaching out to TechAxis Global. We have received your inquiry.", {
          name: "TechAxis Global",
          htmlBody: clientHtml
        });
      }

      return ContentService.createTextOutput(JSON.stringify({ status: "success", type: "contact", message: "Consultation inquiry recorded and emails sent successfully" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // =====================================================================
    // 2. JOB APPLICATION (from /careers)
    // =====================================================================
    var jobSheet = spreadsheet.getSheetByName("Job Applications");
    if (!jobSheet) {
      jobSheet = spreadsheet.insertSheet("Job Applications");
    }

    // Initialize Header Row if new sheet
    if (jobSheet.getLastRow() === 0) {
      jobSheet.appendRow([
        "Timestamp (EST)",
        "Position Applied For",
        "Candidate Name",
        "Email Address",
        "Phone Number",
        "Resume (Google Drive Link)",
        "Cover Note / Message"
      ]);
      var jHeader = jobSheet.getRange(1, 1, 1, 7);
      jHeader.setFontWeight("bold");
      jHeader.setBackground("#B42318");
      jHeader.setFontColor("#FFFFFF");
      jobSheet.setFrozenRows(1);
    }

    // Process Resume File & Save to Google Drive
    var resumeDriveUrl = "No file attached";
    var resumeBlob = null;

    if (data.resumeBase64) {
      var decodedBytes = Utilities.base64Decode(data.resumeBase64);
      var fileName = data.resumeFileName || "Candidate_Resume.pdf";
      var contentType = data.resumeContentType || "application/pdf";
      resumeBlob = Utilities.newBlob(decodedBytes, contentType, fileName);

      var folderName = "TAG Resumes";
      var folders = DriveApp.getFoldersByName(folderName);
      var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
      
      var driveFile = folder.createFile(resumeBlob);
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      resumeDriveUrl = driveFile.getUrl();
    }

    var formattedDate = Utilities.formatDate(new Date(), "America/New_York", "yyyy-MM-dd HH:mm:ss");
    var resumeCellValue = resumeDriveUrl !== "No file attached" 
      ? '=HYPERLINK("' + resumeDriveUrl + '", "View Resume 📄")'
      : "No file attached";

    var newCandidateRow = [
      formattedDate,
      data.role || "N/A",
      data.name || "N/A",
      data.email || "N/A",
      data.phone || "N/A",
      resumeCellValue,
      data.message || ""
    ];

    if (jobSheet.getLastRow() <= 1) {
      jobSheet.appendRow(newCandidateRow);
    } else {
      jobSheet.insertRowBefore(2);
      jobSheet.getRange(2, 1, 1, 7).setValues([newCandidateRow]);
    }

    // Send HR Email Notification with Resume Attached
    var destinationHR = TAG_INBOX || Session.getActiveUser().getEmail();
    var hrSubject = "New Job Application – " + (data.role || "Role") + " – " + (data.name || "Candidate");
    
    var hrHtmlBody = 
      "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E5E5EA;border-radius:16px;overflow:hidden;'>" +
        "<div style='background:#1D1D1F;padding:24px 28px;color:#ffffff;'>" +
          "<span style='background:#B42318;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700;'>TECHAXIS GLOBAL CAREERS</span>" +
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

    // Send Automatic Confirmation Email to Applicant
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

      MailApp.sendEmail(data.email, applicantSubject, "Thank you for applying for " + data.role + ". Our team has received your application.", {
        name: "TechAxis Global Careers",
        htmlBody: applicantHtml
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", type: "application", message: "Application recorded and emails sent successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
