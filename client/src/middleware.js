import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isProtectedAdminRoute = path.startsWith("/admin/") && path !== "/admin";

  const token = request.cookies.get("access_token");

  if (isProtectedAdminRoute && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (token && path === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
