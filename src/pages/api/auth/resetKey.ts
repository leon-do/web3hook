import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

type Data = {
  data: string;
};

// Reset new api keys for user when they click "Reset API Key" button on /dashboard page
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/auth/resetKey");
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ data: "Unauthorized" });
    if (!session.user?.email) return res.status(401).json({ data: "Unauthorized" });
    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        apiKey: createId(),
      },
    });
    if (!user) return res.status(401).json({ data: "Unauthorized" });
    res.status(200).json({ data: user.apiKey });
  } catch (error) {
    console.error(error);
    res.status(400).json({ data: "Error" });
  }
}
