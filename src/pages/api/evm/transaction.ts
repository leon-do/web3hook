import type { NextApiRequest, NextApiResponse } from "next";

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

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/evm/transaction", JSON.stringify(req.body));
  const transaction: Transaction = req.body;
  // query database
  
  res.status(200).json({ success: true });
}
