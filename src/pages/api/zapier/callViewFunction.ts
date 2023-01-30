import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rpcs: RPCs = {
  "5": "https://rpc.ankr.com/eth_goerli/81817392c8df680308a07721d2b9951dc18e8ae1881e32607bb62efc85b54912",
};

type RPCs = {
  [key: string]: string;
};

type Data = {
  data: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/callViewFunction");
    // query database for user with api_key
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ data: "" });
    const { chainId, address, abi, func, args } = req.body;
    const provider = new ethers.providers.JsonRpcProvider(rpcs[chainId]);
    const contract = new ethers.Contract(address, abi, provider);
    let val;
    if (args === "") {
      val = await contract[func]();
    } else {
      val = await contract[func](...args.split(",").map((arg: string) => arg.trim()));
    }
    return res.status(200).send({ data: val.toString() });
  } catch (error: any) {
    return res.status(400).json({ data: error.message as string });
  }
}
