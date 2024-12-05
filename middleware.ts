import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  if (!token) {
    const url = new URL("/api/auth/signin", request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // matcher:["/((?!).*)"] // for development
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
