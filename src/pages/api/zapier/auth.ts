import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

// https://platform.zapier.com/docs/apikey
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/auth");
    const { api_key } = req.body;
    if (!api_key) return res.status(400).json({ success: false });
    // query database for user with api_key
    const user = await prisma.user.findUnique({
      where: {
        apiKey: api_key,
      },
    });
    if (user) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false });
  } catch {
    return res.status(400).json({ success: false });
  }
}
