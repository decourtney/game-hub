import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  if (!token) {
    // Redirect to the custom sign-in page if not authenticated
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Example: Restrict access based on roles
  const isAdminRoute = request.nextUrl.pathname.startsWith("/account");
  console.log("isAdminRoute:", isAdminRoute);
  if (isAdminRoute && token.role !== "admin") {
    return new NextResponse("Forbidden: Admins only", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/api/account/:path*"], // Adjust paths as needed
};
