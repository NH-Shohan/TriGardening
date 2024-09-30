import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isProtectedAdminRoute = path.startsWith("/admin/") && path !== "/admin";

  const authCookie = request.cookies.get("access_token");

  if (isProtectedAdminRoute && !authCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (authCookie && path === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
