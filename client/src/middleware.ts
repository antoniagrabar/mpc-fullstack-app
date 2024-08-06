import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { AUTHORIZED_PATHS, ANALYST_RESTRICTED_PATHS } from "./constants";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow requests to authorized paths
  if (AUTHORIZED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the user token and check its status
  const token = await getToken({ req });

  if (!token || token.status === "unauthenticated") {
    // If the user is unauthenticated, redirect them to the login page
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated, check if the user is analyst
  if (
    token.user?.email === process.env.NEXT_PUBLIC_ANALYST_EMAIL &&
    ANALYST_RESTRICTED_PATHS.includes(pathname)
  ) {
    const restrictedUrl = new URL("/statistics", req.nextUrl.origin); // Redirect to a default allowed path /statistics
    return NextResponse.redirect(restrictedUrl);
  }

  // Allow the request if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
