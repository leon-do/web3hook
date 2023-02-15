import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { RelayerTransaction } from "defender-relay-client";
import { DefenderRelaySigner, DefenderRelayProvider } from "defender-relay-client/lib/ethers";
import { PrismaClient } from "@prisma/client";
import incrementUsage from "@/utils/incrementUsage";

const prisma = new PrismaClient();

type ErrorResponse = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RelayerTransaction | ErrorResponse>) {
  try {
    console.log("/openzepplin/writeFunction");
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    if (!user || !user.stripe) return res.status(401).send({ error: "Unauthorized User" });
    const { apiKey, apiSecret, abi, address, func, args, amount } = req.body;
    const provider = new DefenderRelayProvider({ apiKey, apiSecret });
    const signer = new DefenderRelaySigner({ apiKey, apiSecret }, provider, { speed: "fast" });
    const contract = new ethers.Contract(address, abi, signer);
    let response: RelayerTransaction;
    if (args === "") {
      response = await contract[func](...args.split(",").map((arg: string) => arg.trim()), {
        value: amount === "" ? amount : 0,
      });
    } else {
      response = await contract[func](...args.split(",").map((arg: string) => arg.trim()), {
        value: amount === "" ? amount : 0,
      });
    }
    await incrementUsage(user.stripe);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Send Transaction Error" });
  }
}
