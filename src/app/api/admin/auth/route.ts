import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  validateAdminCredentials,
  createAdminSessionToken,
  verifyAdminSessionToken
} from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(username, password);
    if (!isValid) {
      // Artificial 400ms delay to thwart brute-force timing attacks
      await new Promise((res) => setTimeout(res, 400));
      return NextResponse.json(
        { success: false, error: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken(username.trim());
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: username.trim()
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err: any) {
    console.error("[Admin Auth API] Error during authentication:", err);
    return NextResponse.json(
      { success: false, error: "Authentication service error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully"
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return response;
}

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookieMatch = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]*)`));
    const token = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;

    const isValid = await verifyAdminSessionToken(token);
    return NextResponse.json({
      authenticated: isValid,
      username: isValid ? (process.env.ADMIN_USERNAME || "admin") : null
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
