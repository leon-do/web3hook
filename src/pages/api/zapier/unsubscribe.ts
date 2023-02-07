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
    console.log("/zapier/unsubscribe", req.body);
    if (!req.body.webhookUrl) return res.status(400).send({ success: false });
    // query database for user with api_key
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    console.log("user", user)
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // respond true
    res.status(200).send({ success: true });
    // delete webhook in database
    const trigger = await prisma.trigger.delete({ where: { webhookUrl: req.body.webhookUrl } });
    // delete webhook in moralis
    Moralis.Streams.delete({ id: trigger.streamId || "" });
  } catch {
    return res.status(400).send({ success: false });
  }
}
