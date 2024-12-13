import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { config } from "@/auth";

export const authOptions: NextAuthOptions = {
  ...config,
};

export default NextAuth(authOptions);
