import type { NextApiRequest, NextApiResponse } from "next";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Trigger } from "../../../database/models/trigger";

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/unsubscribe", req);
    // query database for user with api_key
    const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // delete webhook in database
    await tigrisDb.getCollection<Trigger>(Trigger).deleteOne({ filter: { webhookUrl: req.body.webhookUrl } });
    return res.status(200).send({ success: true });
  } catch {
    return res.status(400).send({ success: false });
  }
}
