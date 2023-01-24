import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

/*
  Authenticate Zapier API key against database
*/
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/auth", req.body);
    const { api_key } = req.body;
    if (!api_key) return res.status(400).json({ success: false });
    // query database for user with api_key

    if (api_key === "123") {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false });
  } catch {
    return res.status(400).json({ success: false });
  }
}
