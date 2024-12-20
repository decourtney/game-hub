import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // Optional: Add Credentials-based Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          // Ensure database connection
          await dbConnect();

          // Find the user in the database
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Validate the password (assumes passwords are hashed)
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Return user object for session
          return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Authorize error:", error);
          return null; // Return null if authorization fails
        }
      },
    }),
  ],
  callbacks: {
    // Add user ID to session object
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string; // Safely attach user ID
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Pass user ID to session
      }
      return token;
    },
  },
  events: {
    // Perform actions after events
    signOut: async (message) => {
      console.log("User signed out:", message);
    },
    signIn: async (message) => {
      console.log("User signed out:", message);
    },
  },
  pages: {
    signIn: "/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  logger: {
    error: (code, metadata) => {
      console.error("NextAuth Error:", code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have this set
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, options);
}
