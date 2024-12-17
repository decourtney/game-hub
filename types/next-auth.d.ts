import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add `id` field
    } & DefaultSession["user"]; // Retain other default user fields
  }

  interface User {
    id: string; // Ensure User has an `id` field
  }
}
