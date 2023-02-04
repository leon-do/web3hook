import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Trigger } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/subscribe");
    // query database for user with api_key
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // define Trigger to insert
    const trigger: Trigger = {
      userId: user.id as string,
      webhookUrl: req.body.webhookUrl as string,
      chainId: Number(req.body.chainId) as number,
      address: req.body.address.toLowerCase() as string,
      abi: req.body.abi as string,
    };
    // insert to transaction database
    await prisma.trigger.create({ data: trigger });
    return res.status(200).redirect(req.body.webhookUrl as string);
  } catch (error) {
    console.log(error)
    return res.status(400).send({ success: false });
  }
}
