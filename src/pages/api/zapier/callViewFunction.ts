import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

const providers: Providers = {
  "1": new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth"),
  "5": new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli"),
  "5001": new ethers.providers.JsonRpcProvider("https://rpc.testnet.mantle.xyz"),
};

type Providers = {
  [key: string]: ethers.providers.JsonRpcProvider;
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
    if (!user) return res.status(400).send({ data: "Invalid API Key" });
    // get request body
    const { chainId, address, abi, func, args } = req.body;
    // get provider
    const provider = providers[chainId];
    if (!provider) return res.status(400).send({ data: "Invalid Chain ID" });
    // create contract
    const contract = new ethers.Contract(address, abi, provider);
    // call function
    let val;
    if (args === "") {
      val = await contract[func]();
    } else {
      val = await contract[func](...args.split(",").map((arg: string) => arg.trim()));
    }
    incrementCredits(user);
    return res.status(200).send({ data: val.toString() });
  } catch (error: any) {
    return res.status(400).json({ data: error.message as string });
  }
}

async function incrementCredits(_user: User): Promise<User> {
  return await prisma.user.update({
    where: {
      id: _user.id,
    },
    data: {
      credits: {
        increment: 1,
      },
    },
  });
}
