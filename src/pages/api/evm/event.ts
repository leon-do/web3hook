import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Trigger } from "../../../database/models/trigger";
import { LogicalOperator, SelectorFilterOperator } from "@tigrisdata/core";

type Data = {
  success: boolean;
};

type HookRequest = {
  chainId: number;
  log: ethers.providers.Log;
};

type HookResponse = {
  transactionHash: string;
  [key: string]: null | string | number | boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ success: true });
  try {
    if (req.headers["x-admin-key"] !== process.env.X_ADMIN_KEY) return;
    const event: HookRequest = req.body;
    // query triggers
    const triggers = await queryDatabase(event);
    console.log(triggers);
    // filter events with abi then format response object
    triggers
      .filter((val) => val.abi)
      .forEach((trigger) => {
        const hookResponse: HookResponse = getHookResponse(trigger.abi, event.log);
        console.log(hookResponse);
        // POST to webhookUrl
        axios.post(trigger.webhookUrl, hookResponse);
      });
  } catch (error) {
    console.log("/evm/event", error);
  }
}

async function queryDatabase(event: HookRequest): Promise<Trigger[]> {
  return await (
    await tigrisDb.getCollection<Trigger>(Trigger).findMany({
      filter: {
        op: LogicalOperator.AND,
        selectorFilters: [
          {
            chainId: event.chainId,
          },
          {
            address: event.log.address.toLowerCase(),
          },
        ],
      },
    })
  ).toArray();
}

/*
 * Creates response object to emit to zapier
 */
function getHookResponse(_abi: string, _log: ethers.providers.Log): HookResponse {
  const hookResponse = { transactionHash: _log.transactionHash };
  const iface = new ethers.utils.Interface(_abi);
  // fill event object with null values
  for (const key in iface.events) {
    const eventName = iface.events[key].name;
    iface.events[key].inputs.forEach((input) => {
      hookResponse[`${eventName}_${input.name}`] = null;
    });
  }
  const eventSignature = iface.parseLog({ data: _log.data, topics: _log.topics });
  // fill event object with values from eventSignature
  for (const key in eventSignature.args) {
    if (!isNaN(Number(key))) continue;
    const eventName = eventSignature.name;
    hookResponse[`${eventName}_${key}`] = eventSignature.args[key].toString();
  }
  return hookResponse;
}
