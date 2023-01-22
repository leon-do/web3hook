// https://platform.zapier.com/docs/apikey#form
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

/*
  Subscribe zapier to a webhook
  curl --location --request POST 'localhost:3000/api/zapier/subscribe?api_key=123&hook_url=https://hooks.zapier.com/hooks/catch/13294804/bjvjza5' 
*/
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/subscribe", req.body);
    const api_key = req.query.api_key as string;
    const hook_url = req.query.hook_url as string;
    // query database for user with api_key

    // add to events database

    return res.status(200).redirect(hook_url);
  } catch {
    return res.status(400).send({ success: false });
  }
}
