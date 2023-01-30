import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PerformList = {
  transactionHash: string;
  [key: string]: string;
};

// https://platform.zapier.com/docs/faq#i-get-a-trigger-error-saying-that-an-array-is-expected-how-do-i-fix-it
export default async function handler(req: NextApiRequest, res: NextApiResponse<PerformList[]>) {
  try {
    console.log("/zapier/eventPerformList");
    // query database for user with api_key
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send([]);
    return res.status(200).send([getPerformList(req.body.abi as string)]);
  } catch {
    return res.status(400).send([]);
  }
}

function getPerformList(_abi: string): PerformList {
  const emptyEvents: PerformList = { transactionHash: "0x0" };
  const iface = new ethers.utils.Interface(_abi);
  // fill event object with null values
  for (const key in iface.events) {
    const eventName = iface.events[key].name;
    iface.events[key].inputs.forEach((input) => {
      emptyEvents[`${eventName}_${input.name}`] = "0x0";
    });
  }
  return emptyEvents;
}
