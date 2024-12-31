import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Custom field
      role: string; // Custom field
      name?: string | null; // Default NextAuth field
      email?: string | null; // Default NextAuth field
      image?: string | null; // Default NextAuth field
    };
  }

  interface User {
    id: string; // Ensure User has an `id` field
    role: string; // Add `role` field
  }
}
