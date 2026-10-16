import fs from "fs";
import path from "path";

export interface JobApplicationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  resumeFileName: string;
  resumePath?: string;
  resumeUrl?: string;
  timestamp: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");
const RESUMES_DIR = path.join(process.cwd(), "public", "uploads", "resumes");

function ensureDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(RESUMES_DIR)) {
    fs.mkdirSync(RESUMES_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

/**
 * Saves an uploaded resume file to public/uploads/resumes
 */
export async function saveResumeFile(
  fileBuffer: Buffer,
  originalFilename: string,
  applicantName: string
): Promise<{ fileName: string; relativeUrl: string; fullPath: string }> {
  ensureDirectories();

  const ext = path.extname(originalFilename) || ".pdf";
  const sanitizedName = applicantName.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 30);
  const timestamp = Date.now();
  const safeFileName = `${timestamp}_${sanitizedName}${ext}`;
  const fullPath = path.join(RESUMES_DIR, safeFileName);

  await fs.promises.writeFile(fullPath, fileBuffer);

  return {
    fileName: safeFileName,
    relativeUrl: `/uploads/resumes/${safeFileName}`,
    fullPath
  };
}

/**
 * Persists application to JSON database & optionally syncs to Google Sheets webhook
 */
export async function saveApplicationRecord(
  record: JobApplicationRecord
): Promise<void> {
  ensureDirectories();

  try {
    let applications: JobApplicationRecord[] = [];
    if (fs.existsSync(APPLICATIONS_FILE)) {
      const content = await fs.promises.readFile(APPLICATIONS_FILE, "utf8");
      try {
        applications = JSON.parse(content);
        if (!Array.isArray(applications)) applications = [];
      } catch {
        applications = [];
      }
    }

    applications.unshift(record);
    await fs.promises.writeFile(
      APPLICATIONS_FILE,
      JSON.stringify(applications, null, 2),
      "utf8"
    );

    // Optional Google Sheet Webhook Sync
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetWebhook && sheetWebhook.startsWith("http")) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: record.timestamp,
            role: record.role,
            name: record.name,
            email: record.email,
            phone: record.phone,
            message: record.message,
            resumeFileName: record.resumeFileName,
            resumeUrl: record.resumeUrl || "N/A"
          })
        });
        console.log(`[Storage] Synced application ${record.id} to Google Sheet Webhook`);
      } catch (sheetErr) {
        console.error("[Storage] Google Sheet webhook sync failed:", sheetErr);
      }
    }
  } catch (error) {
    console.error("[Storage] Failed to save application record to disk:", error);
    throw error;
  }
}

/**
 * Retrieves all stored applications
 */
export async function getApplicationRecords(): Promise<JobApplicationRecord[]> {
  ensureDirectories();
  try {
    const content = await fs.promises.readFile(APPLICATIONS_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}
