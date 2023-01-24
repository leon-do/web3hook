import type { NextApiRequest, NextApiResponse } from "next";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Event } from "../../../database/models/event";

type Transaction = {
  hash: string;
  type: number;
  accessList: any[] | null;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  confirmations: number;
  from: string;
  gasPrice: { type: string; hex: string };
  maxPriorityFeePerGas: { type: string; hex: string };
  maxFeePerGas: { type: string; hex: string };
  gasLimit: { type: string; hex: string };
  to: string;
  value: { type: string; hex: string };
  nonce: number;
  data: string;
  r: string;
  s: string;
  v: number;
  creates?: any;
  chainId: number;
  contractAddress: string | null;
  gasUsed: { type: string; hex: string };
  logsBloom: string;
  transactionHash: string;
  logs: { transactionIndex: number; blockNumber: number; transactionHash: string; address: string; topics: string[]; data: string; logIndex: number; blockHash: string }[];
  cumulativeGasUsed: { type: string; hex: string };
  effectiveGasPrice: { type: string; hex: string };
  status: number;
  byzantium: boolean;
};

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/evm/transaction");
  if (req.headers["x-admin-key"] !== process.env.X_ADMIN_KEY) return res.status(401).json({ success: false });
  const transaction: Transaction = req.body;
  // query database for user with api_key
  const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send({ success: false });
  // query logs
  const eventsRespones = await tigrisDb.getCollection<Event>(Event).findMany({
    filter: {
      address: transaction.to || transaction.contractAddress,
    },
  });
  const events = await eventsRespones.toArray();
  console.log(events);
  res.status(200).json({ success: true });
}
