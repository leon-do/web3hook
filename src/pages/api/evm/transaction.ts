import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Transaction } from "../../../database/models/transaction";
import { LogicalOperator } from "@tigrisdata/core";

type Data = {
  success: boolean;
};

// forwarding response to this endpoint
type TransactionRequest = ethers.providers.TransactionResponse;

type TransactionResponse = {
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/evm/transaction");
  if (req.headers["x-admin-key"] !== process.env.X_ADMIN_KEY) return res.status(401).json({ success: false });
  const transaction: TransactionRequest = req.body;
  // query database for user with api_key
  const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send({ success: false });
  // get user transactions
  const userTransactions = await tigrisDb.getCollection<Transaction>(Transaction).findMany({
    filter: {
      op: LogicalOperator.AND,
      selectorFilters: [
        {
          chainId: transaction.chainId,
        },
      ],
      logicalFilters: [
        {
          op: LogicalOperator.OR,
          selectorFilters: [
            {
              address: transaction.from.toLowerCase(),
            },
            {
              address: transaction.to.toLocaleLowerCase(),
            },
          ],
        },
      ],
    },
  });
  // loop through transactions and emit
  (await userTransactions.toArray()).forEach((event) => {
    const emitTransaction: TransactionResponse = {
      fromAddress: transaction.from,
      toAddress: transaction.to,
      value: ethers.BigNumber.from(transaction.value).toString(),
      transactionHash: transaction.hash,
    };
    console.log(`emiting ${emitTransaction} to ${event.webhookUrl}`);
    // POST reqeust to webhookUrl
    axios.post(event.webhookUrl, JSON.stringify(emitTransaction));
  });
  return res.status(200).json({ success: true });
}
