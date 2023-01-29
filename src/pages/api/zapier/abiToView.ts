import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import { Raleway } from "@next/font/google";

const prisma = new PrismaClient();

type Data = {
  key: string;
  choices: string[];
};

type ABI = {
  stateMutability: string;
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/abiToView");
    const abi: ABI[] = JSON.parse(req.body.abi);
    // filter out view function names
    const views: string[] = abi.filter((item) => item.stateMutability === "view").map((item) => item.name);
    return res.status(200).send({ key: "view", choices: views });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ key: "view", choices: [] });
  }
}

function abiToView(_abi: ABI[]): Data {
  const views: string[] = _abi.filter((item) => item.stateMutability === "view").map((item) => item.name);
  return { key: "view", choices: views };
}
