import type { NextApiRequest, NextApiResponse } from "next";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";

type PerformList = {
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PerformList[]>) {
  console.log("/zapier/transactionPerformList");
  // query database for user with api_key
  const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send([]);
  return res.status(200).send([
    {
      transactionHash: "0x0",
      fromAddress: "0x0",
      toAddress: "0x0",
      value: "0",
    },
  ]);
}
