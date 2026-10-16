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
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(RESUMES_DIR)) {
      fs.mkdirSync(RESUMES_DIR, { recursive: true });
    }
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    // Gracefully handle read-only filesystems on serverless hosting (Vercel/Netlify/Lambda)
    console.log("[Storage: Info] Serverless read-only filesystem; skipping local directory creation.");
  }
}

/**
 * Saves an uploaded resume file to local disk (if writable)
 */
export async function saveResumeFile(
  fileBuffer: Buffer,
  originalFilename: string,
  applicantName: string
): Promise<{ fileName: string; relativeUrl: string; fullPath: string }> {
  const ext = path.extname(originalFilename) || ".pdf";
  const sanitizedName = applicantName.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 30);
  const timestamp = Date.now();
  const safeFileName = `${timestamp}_${sanitizedName}${ext}`;
  const fullPath = path.join(RESUMES_DIR, safeFileName);

  try {
    ensureDirectories();
    await fs.promises.writeFile(fullPath, fileBuffer);
  } catch (err) {
    console.log("[Storage: Info] Serverless read-only filesystem; skipping local resume file write.");
  }

  return {
    fileName: safeFileName,
    relativeUrl: `/uploads/resumes/${safeFileName}`,
    fullPath
  };
}

/**
 * Persists application to JSON database (if writable)
 */
export async function saveApplicationRecord(
  record: JobApplicationRecord
): Promise<void> {
  try {
    ensureDirectories();
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
  } catch (error) {
    console.log("[Storage: Info] Serverless read-only filesystem; skipping local JSON backup.");
  }
}

/**
 * Retrieves stored applications
 */
export async function getApplicationRecords(): Promise<JobApplicationRecord[]> {
  try {
    ensureDirectories();
    if (fs.existsSync(APPLICATIONS_FILE)) {
      const content = await fs.promises.readFile(APPLICATIONS_FILE, "utf8");
      return JSON.parse(content);
    }
  } catch {
    // read-only or empty
  }
  return [];
}
