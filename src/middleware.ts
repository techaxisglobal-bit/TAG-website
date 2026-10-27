import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow login page and auth API without protection
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    // If user is already authenticated and visits /admin/login, redirect to /admin/consultations
    if (pathname === "/admin/login") {
      const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const isAuthenticated = await verifyAdminSessionToken(sessionCookie);
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin/consultations", request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthenticated = await verifyAdminSessionToken(sessionCookie);

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Protect all /api/admin routes
  if (pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthenticated = await verifyAdminSessionToken(sessionCookie);

    if (!isAuthenticated) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Access denied. Valid administrator authentication session required."
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*"
  ]
};
