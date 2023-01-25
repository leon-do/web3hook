import type { NextApiRequest, NextApiResponse } from "next";

type PerformList = {
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PerformList[]>) {
  return res.status(400).send([
    {
      transactionHash: "0x0",
      fromAddress: "0x0",
      toAddress: "0x0",
      value: "0x0",
    },
  ]);
}
