import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Trigger } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  res.status(200).json({ success: true });
}
