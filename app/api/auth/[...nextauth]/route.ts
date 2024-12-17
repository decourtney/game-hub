import NextAuth, { NextAuthOptions } from "next-auth";
import { options } from "@/auth";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
