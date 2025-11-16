import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "./lib/cookies";

interface JWTPayload {
  role: string;
  id: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = await getAccessToken();
  const authRoutes = ["/dashboard"];

  if (!token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<JWTPayload>(token);

      if (decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("authToken");
        // TODO: Request a new auth token
        return response;
      }

      if (!pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
