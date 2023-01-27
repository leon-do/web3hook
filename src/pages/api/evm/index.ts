import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Trigger } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  success: Trigger[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const x = await prisma.trigger.findMany({ where: {} });
  console.log(x);

  res.status(200).json({ success: x });
}
