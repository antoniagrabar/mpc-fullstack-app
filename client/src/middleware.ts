import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTHORIZED_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  // Extract the pathname from the request
  const { pathname } = req.nextUrl;

  // Allow requests to authorized paths
  if (AUTHORIZED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Check the session status
  const token = await getToken({ req });

  if (!token || token.status === "unauthenticated") {
    // If the user is unauthenticated, redirect them to the login page
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request if the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
