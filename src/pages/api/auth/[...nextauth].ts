import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import * as Prisma from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const prisma = new Prisma.PrismaClient();

// https://github.com/nextauthjs/next-auth-example/blob/main/pages/api/auth/%5B...nextauth%5D.ts
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
};

export default NextAuth(authOptions);
