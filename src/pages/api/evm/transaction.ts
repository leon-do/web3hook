import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Trigger } from "../../../database/models/trigger";
import { LogicalOperator } from "@tigrisdata/core";

type Data = {
  success: boolean;
};

// forwarding response to this endpoint
type HookRequest = ethers.providers.TransactionResponse;

type HookResponse = {
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/evm/transaction");
  if (req.headers["x-admin-key"] !== process.env.X_ADMIN_KEY) return res.status(401).json({ success: false });
  const transaction: HookRequest = req.body;
  // query database for user with api_key
  const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send({ success: false });
  // get user transactions
  const triggers = await tigrisDb.getCollection<Trigger>(Trigger).findMany({
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
  (await triggers.toArray()).forEach((trigger) => {
    const emitTransaction: HookResponse = {
      fromAddress: transaction.from,
      toAddress: transaction.to,
      value: ethers.BigNumber.from(transaction.value).toString(),
      transactionHash: transaction.hash,
    };
    console.log(`emiting ${emitTransaction} to ${trigger.webhookUrl}`);
    // POST reqeust to webhookUrl
    axios.post(trigger.webhookUrl, JSON.stringify(emitTransaction));
  });
  return res.status(200).json({ success: true });
}
