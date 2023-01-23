import type { NextApiRequest, NextApiResponse } from "next";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Transaction } from "../../../database/models/transaction";

type Data = {
  success: boolean;
};

/*
  Subscribe zapier to a webhook
  curl --location --request POST 'localhost:3000/api/zapier/subscribe?api_key=123&hook_url=https://hooks.zapier.com/hooks/catch/13294804/bjvjza5' 
  https://platform.zapier.com/docs/apikey#form
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/subscribe");
    // query database for user with api_key
    const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // define Transaction to insert
    const transaction: Transaction = {
      webhookUrl: req.body.webhookUrl as string,
      userId: user.userId as string,
      chainId: req.body.chainId as number,
      fromAddress: req.body.fromAddress as string,
      toAddress: req.body.toAddress as string,
      contractAddress: req.body.contractAddress as string,
      eventName: req.body.eventName as string,
    };
    // insert to transaction database
    await tigrisDb.getCollection<Transaction>(Transaction).insertOne(transaction);
    return res.status(200).redirect(req.body.webhookUrl as string);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
}
