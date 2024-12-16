import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { options } from "@/auth";

export const authOptions: NextAuthOptions = {
  ...options,
};

export default NextAuth(authOptions);
