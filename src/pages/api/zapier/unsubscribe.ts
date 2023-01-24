import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/unsubscribe", req);
    const api_key = req.query.api_key as string;
    const hook_url = req.query.hook_url as string;
    // query database for user with api_key

    // delete transaction in database

    return res.status(200).redirect(hook_url);
  } catch {
    return res.status(400).send({ success: false });
  }
}
