import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Moralis from "moralis";

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
}

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

// https://platform.zapier.com/docs/triggers#unsubscribe
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/unsubscribe");
    if (!req.body.webhookUrl) return res.status(400).send({ success: false });
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    if (!user) return res.status(401).send({ success: false });
    // delete webhook from database
    const trigger = await prisma.trigger.delete({ where: { webhookUrl: req.body.webhookUrl } });
    // delete webhook from moralis
    await Moralis.Streams.delete({ id: trigger.streamId || "" });
    res.status(200).send({ success: true });
  } catch {
    return res.status(400).send({ success: false });
  }
}
