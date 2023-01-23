import type { NextApiRequest, NextApiResponse } from "next";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Event } from "../../../database/models/event";

type Data = {
  success: boolean;
};

/*
  Subscribe zapier to a webhook
  https://platform.zapier.com/docs/apikey#form
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/subscribe");
    // query database for user with api_key
    const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // define Event to insert
    const event: Event = {
      webhookUrl: req.body.webhookUrl as string,
      userId: user.userId as string,
      chainId: req.body.chainId as number,
      fromAddress: req.body.fromAddress as string,
      toAddress: req.body.toAddress as string,
      contractAddress: req.body.contractAddress as string,
      eventName: req.body.eventName as string,
    };
    // insert to transaction database
    await tigrisDb.getCollection<Event>(Event).insertOne(event);
    return res.status(200).redirect(req.body.webhookUrl as string);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
}
