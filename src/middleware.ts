import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/" ||
    path === "/login" ||
    path === "/resetpassword" ||
    path === "/createnewpassword" ||
    path === "/logout" ||
    path === "/signup" ||
    path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/logout",
    "/profile",
    "/signup",
    "/verifyemail",
    "/resetpassword",
    "/createnewpassword",
    "/profile/:path*",
  ],
};
