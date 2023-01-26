import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import tigrisDb from "../../../database/tigris";
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
  res.status(200).json({ success: true });
  try {
    if (req.headers["x-admin-key"] !== process.env.X_ADMIN_KEY) return;
    const transaction: HookRequest = req.body;
    // query triggers
    const triggers = await queryDatabase(transaction);
    // filter events with no abi then format response object
    triggers
      .filter((val) => !val.abi)
      .forEach((trigger) => {
        const hookResponse: HookResponse = {
          fromAddress: transaction.from,
          toAddress: transaction.to,
          value: ethers.BigNumber.from(transaction.value).toString(),
          transactionHash: transaction.hash,
        };
        console.log(JSON.stringify(hookResponse));
        // POST reqeust to webhookUrl
        axios.post(trigger.webhookUrl, hookResponse);
      });
  } catch (error) {
    console.log("/evm/transaction", error);
  }
}

async function queryDatabase(transaction: HookRequest): Promise<Trigger[]> {
  return await (
    await tigrisDb.getCollection<Trigger>(Trigger).findMany({
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
                address: transaction.from ? transaction.from.toLowerCase() : "",
              },
              {
                address: transaction.to ? transaction.to.toLowerCase() : "",
              },
            ],
          },
        ],
      },
    })
  ).toArray();
}
