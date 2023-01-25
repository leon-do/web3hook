import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import tigrisDb from "../../../database/tigris";
import { User } from "../../../database/models/user";

type PerformList = {
  transactionHash: string;
  [key: string]: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PerformList[]>) {
  try {
    console.log("/zapier/perfomList");
    // query database for user with api_key
    const user = await tigrisDb.getCollection<User>(User).findOne({ filter: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send([]);
    return res.status(200).send([getPerformList(req.body.abi as string)]);
  } catch {
    return res.status(400).send([]);
  }
}

function getPerformList(_abi: string): PerformList {
  const emptyEvents = {transactionHash: "0x0"};
  const iface = new ethers.utils.Interface(_abi);
  // fill event object with null values
  for (const key in iface.events) {
    const eventName = iface.events[key].name;
    iface.events[key].inputs.forEach((input) => {
      emptyEvents[`${eventName}_${input.name}`] = "0x0";
    });
  }
  return emptyEvents;
}
