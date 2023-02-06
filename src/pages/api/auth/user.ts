import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
  apiKey: string;
  credits: number;
  paid: boolean;
};

// Gets user data for /dashboard page
export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ apiKey: "", credits: 0, paid: false });
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  if (!user) return res.status(401).json({ apiKey: "", credits: 0, paid: false });
  res.status(200).json({ apiKey: user.apiKey, credits: user.credits, paid: user.paid });
}
