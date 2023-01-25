import type { NextApiRequest, NextApiResponse } from "next";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Trigger } from "../../../database/models/trigger";

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/subscribe");
    // query database for user with api_key
    const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // define Trigger to insert
    const trigger: Trigger = {
      userId: user.userId as string,
      webhookUrl: req.body.webhookUrl as string,
      chainId: req.body.chainId as number,
      address: req.body.address.toLowerCase() as string,
      abi: req.body.abi as string,
    };
    // insert to transaction database
    await tigrisDb.getCollection<Trigger>(Trigger).insertOne(trigger);
    return res.status(200).redirect(req.body.webhookUrl as string);
  } catch {
    return res.status(400).send({ success: false });
  }
}
