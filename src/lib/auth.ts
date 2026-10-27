export const ADMIN_COOKIE_NAME = "tag_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || "tag-default-secret-change-in-production-2026";
}

function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || "admin";
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "TAGAdmin2026!";
}

/**
 * Validates the credentials against configured environment variables
 */
export function validateAdminCredentials(user: string, pass: string): boolean {
  const expectedUser = getAdminUsername();
  const expectedPass = getAdminPassword();

  if (!user || !pass) return false;
  return user.trim() === expectedUser.trim() && pass.trim() === expectedPass.trim();
}

/**
 * Creates an HMAC-SHA256 signature using the Web Crypto API (runs in both Edge and Node.js)
 */
async function signMessage(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generates a signed session token: "<username>.<timestamp>.<signature>"
 */
export async function createAdminSessionToken(username: string): Promise<string> {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const signature = await signMessage(payload, getSecretKey());
  return `${username}.${timestamp}.${signature}`;
}

/**
 * Verifies the validity and expiration of a session token
 */
export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [username, timestampStr, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) return false;

  // Check expiration (7 days)
  const now = Date.now();
  if (now - timestamp > SESSION_MAX_AGE * 1000 || timestamp > now + 60000) {
    return false;
  }

  // Check username match
  if (username !== getAdminUsername()) {
    return false;
  }

  // Recompute signature and verify
  const expectedPayload = `${username}:${timestamp}`;
  const expectedSignature = await signMessage(expectedPayload, getSecretKey());

  return expectedSignature === providedSignature;
}
