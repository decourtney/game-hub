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

export const _nextAuthOptions: NextAuthOptions = {
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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          await dbConnect();
          const user = await CredentialsUser.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id,
            role: user.role,
            username: user.username,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null; // Return null if authorization fails
        }
      },
    }),
  ],
  callbacks: {
    // Add necessary fields to JWT token and Session object
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role || "user";
        token.username = user.username;
      }

      if (!token.role) {
        await dbConnect();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user || !account) {
        console.error("No provider or user data found.");
        return false;
      }

      if (account.provider === "credentials") {
        return true;
      }

      if (!profile || !profile.email) {
        console.error(`${account.provider} profile is missing email.`);
        return false;
      }

      await dbConnect();
      const existingUser = await User.findOne({ email: profile.email });

      if (!existingUser) {
        const baseUsername =
          profile.name?.replace(/\s+/g, "").toLowerCase() || "user";
        const uniqueUsername = await generateUniqueUsername(baseUsername);

        const newUser = new OAuthUser({
          username: uniqueUsername,
          email: profile.email,
          provider: account.provider,
          providerId: `${account.provider}_${user.id}`,
          image: user.image || "https://i.pravatar.cc/300",
        });

        await newUser.save();
        user.role = newUser.role; // Add role to user object
        user.username = newUser.username; // Add username to user object
        return true;
      }

      if (existingUser.userType === "CredentialsUser") {
        existingUser.provider = account.provider;
        existingUser.providerId = `${account.provider}_${user.id}`;
        existingUser.image = user.image || "https://i.pravatar.cc/300";
        await existingUser.save();
      }

      // TODO: Add logic to determine if the oauth image or db image should be used based on User settings
      user.role = existingUser.role;
      user.username = existingUser.username;
      user.image = existingUser.image; // Overwrite oauth profile image with db image
      return true;
    },
  },
  events: {
    signOut: async (message) => {
      console.log("User signed out:", message);
    },
    signIn: async (message) => {
      console.log("User signed in:", message);
    },
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  logger: {
    error: (code, metadata) => {
      console.error("NextAuth Error:", code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, _nextAuthOptions);
}
