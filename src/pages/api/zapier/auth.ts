import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name: string;
  email: string;
};

// https://platform.zapier.com/docs/apikey
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/auth");
    const { api_key } = req.body;
    if (!api_key) return res.status(401).json({ name: "", email: "" });
    const user = await prisma.user.findUnique({ where: { apiKey: api_key } });
    if (user) return res.status(200).json({ name: user.name, email: user.email });
    return res.status(400).json({ name: "", email: "" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ name: "", email: "" });
  }
}
