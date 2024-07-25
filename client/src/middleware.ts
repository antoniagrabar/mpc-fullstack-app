import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isUserAuthorized } from "@/utils/auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  const PUBLIC_PATHS = ["/sign-in", "/sign-up"];

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");

  if (token) {
    try {
      const isAuthorized = await isUserAuthorized();

      if (isAuthorized.auth) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
    }
  }

  url.pathname = "/sign-in";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
