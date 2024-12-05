import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import { getMongoDBClient } from "@/lib/dbConnect";

/**
 * Initialize NextAuth with MongoDBAdapter and Google provider.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(await getMongoDBClient()), // Use the raw MongoDB client
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
