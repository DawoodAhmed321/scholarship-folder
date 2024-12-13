import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user_token");
  const { pathname } = req.nextUrl;

  switch (pathname) {
    case "/admin/login":
      if (token) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next();
    default:
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url), {
          headers: {
            "Set-Cookie":
              "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",
          },
        });
      } else {
        return NextResponse.next();
      }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
