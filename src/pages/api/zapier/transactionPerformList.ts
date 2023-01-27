import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PerformList = {
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PerformList[]>) {
  console.log("/zapier/transactionPerformList");
  // query database for user with api_key
  const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send([]);
  return res.status(200).send([
    {
      transactionHash: "0x0",
      fromAddress: "0x0",
      toAddress: "0x0",
      value: "0",
    },
  ]);
}
