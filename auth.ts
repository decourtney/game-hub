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
import { User, CredentialsUser, OAuthUser } from "@/models/BaseUSerSchema";
import bcrypt from "bcrypt";
import { generateUniqueUsername } from "./app/utils/generateUniqueUsername";

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
          const user = await CredentialsUser.findOne({
            email: credentials.email,
          });

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
    async signIn({ user, account, profile }) {
      console.log("Sign in callback:", user, account, profile);

      if (!user || !account) {
        console.log("No provider account provided");
        return false;
      }

      if (account.provider === "credentials") {
        // Skip checks for CredentialsProvider
        console.log("User logged in using credentials:", user.email);
        return true;
      }

      if (account.provider !== "credentials") {
        if (!profile) {
          console.error(`${account.provider} profile is missing`);
          return false; // Reject if profile is missing
        } else if (!profile.email) {
          console.error(`${account.provider} profile email is missing`);
          return false; // Reject if email is missing
        }

        const existingUser = await OAuthUser.findOne({ email: profile.email });

        // If user doesn't exist, create a new user
        if (!existingUser) {
          const baseUsername =
            profile.name?.replace(/\s+/g, "").toLowerCase() || "user";
          const uniqueUsername = await generateUniqueUsername(baseUsername);

          const newUser = new OAuthUser({
            username: uniqueUsername,
            email: profile.email,
            provider: account.provider,
            providerId: `${account.provider}_${user.id}`,
            image: user.image || "/default-avatar.png",
          });

          await newUser.save();
          console.log(
            `New user created via ${account.provider}:`,
            profile.email
          );
        } else {
          if (existingUser.providerId !== `${account.provider}_${user.id}`) {
            console.log("user with that email already exists");
            return false;
          }
        }

        console.log(`User signed in via ${account.provider}:`, profile.email);
        return true;
      }

      console.error("Unsupported provider:");
      return false;
    },
  },
  events: {
    // Perform actions after events
    signOut: async (message) => {
      console.log("User signed out:", message);
    },
    signIn: async (message) => {
      console.log("User signed in:", message);
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
