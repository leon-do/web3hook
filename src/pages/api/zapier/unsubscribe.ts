import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

// https://platform.zapier.com/docs/triggers#unsubscribe
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/unsubscribe");
    if (!req.body.webhookUrl) return res.status(400).send({ success: false });
    // query database for user with api_key
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // delete webhook in database
    await prisma.trigger.delete({ where: { webhookUrl: req.body.webhookUrl } });
    return res.status(200).send({ success: true });
  } catch {
    return res.status(400).send({ success: false });
  }
}
