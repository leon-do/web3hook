import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  data: string;
};

// Get API Key from User
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ data: "Unauthorized" });
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  if (!user) return res.status(401).json({ data: "Unauthorized" });
  res.status(200).json({ data: user.apiKey });
}
