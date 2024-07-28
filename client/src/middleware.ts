import { NextResponse, type NextRequest } from "next/server";

const isUserAuthorized = async (token: any) => {
  const tokenObject = {
    token: token,
  };

  if (token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_PROVIDER_URL}/auth/checkAuth`,
        {
          method: "POST",
          body: JSON.stringify(tokenObject),
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("There is no token.");
  }

  return false;
};

export async function middleware(request: NextRequest) {
  // try {
  //   const token = request.cookies.get("token")?.value;
  //   if (request.nextUrl.pathname === "/logout") {
  //     const response = NextResponse.redirect(new URL("/login", request.url));
  //     response.cookies.delete("token");
  //     console.log("Response cookies: ", response.cookies.getAll());
  //     return response;
  //   }
  //   const isAuthorized = await isUserAuthorized(token);
  //   if (isAuthorized.auth && !request.nextUrl.pathname.startsWith("/")) {
  //     return Response.redirect(new URL("/", request.url));
  //   }
  //   if (!isAuthorized && !request.nextUrl.pathname.startsWith("/login")) {
  //     return Response.redirect(new URL("/login", request.url));
  //   }
  // } catch (error) {
  //   console.error("Error during authentication check:", error);
  //   return Response.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
