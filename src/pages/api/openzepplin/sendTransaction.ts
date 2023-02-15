import type { NextApiRequest, NextApiResponse } from "next";
import { Relayer, RelayerTransaction } from "defender-relay-client";
import { PrismaClient } from "@prisma/client";
import incrementUsage from "@/utils/incrementUsage";

const prisma = new PrismaClient();

type ErrorResponse = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RelayerTransaction | ErrorResponse>) {
  try {
    console.log("/openzepplin/sendTransaction");
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    if (!user || !user.stripe) return res.status(401).send({ error: "Unauthorized User" });
    const { apiKey, apiSecret, to, amount } = req.body;
    const relayer = new Relayer({ apiKey, apiSecret });
    const response = await relayer.sendTransaction({ to, value: amount, gasLimit: 21000, speed: "fast" });
    await incrementUsage(user.stripe);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Send Transaction Error" });
  }
}
