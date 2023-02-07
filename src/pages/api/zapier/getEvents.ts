import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  key: string;
  label: string;
}[];

// create dynamic events for zapier
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/zapier/getEvents");
  // query database for user with api_key
  const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send([]);
  const abi = JSON.parse(req.body.abi);
  const events = abi
    .filter((item: any) => item.type === "event")
    .map((item: any) => {
      const inputs = item.inputs.map((input: any) => input.type).join(",");
      return { id: `${item.name}(${inputs})`, event: `${item.name}(${inputs})` };
    });
  return res.status(200).json(events);
}
