import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";
import { Trigger } from "../../../database/models/trigger";

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
  console.log("/evm/event");
  if (req.headers["x-admin-key"] !== process.env.X_ADMIN_KEY) return res.status(401).json({ success: false });
  const eventReq: HookRequest = req.body;
  // query database for user with api_key
  const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
  // if no user, return error
  if (!user) return res.status(400).send({ success: false });
  // query logs
  const triggers = await tigrisDb.getCollection<Trigger>(Trigger).findMany({
    filter: {
      chainId: eventReq.chainId,
      address: eventReq.log.address.toLowerCase(),
    },
  });
  // loop through events and format request object
  (await triggers.toArray()).forEach((trigger) => {
    const eventRequest: HookResponse = getEventRequest(trigger.abi, eventReq.log);
    console.log(eventRequest);
    // POST to webhookUrl
    axios.post(trigger.webhookUrl, JSON.stringify(eventRequest));
  });
  return res.status(200).json({ success: true });
}

/*
 * Creates object to emit to zapier
 */
function getEventRequest(_abi: string, _log: ethers.providers.Log): HookResponse {
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
