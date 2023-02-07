import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type MoralisBody = {
  confirmed: boolean;
  chainId: string;
  streamId: string;
  txs: {
    hash: string;
    fromAddress: string;
    toAddress: string;
    value: string;
    gas: string;
  }[];
  abi: string[];
  logs: Logs[];
};

type Logs = {
  data: string;
  topic0: string;
  topic1: string;
  topic2: string;
  topic3: string;
};

type HookResponse = {
  transactionHash: string;
  fromAddress?: string;
  toAddress?: string;
  value?: string;
  chainId?: string;
  data?: string;
  gasLimit?: string;
  [key: string]: any;
};

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/moralis/hook", req.body);
  try {
    const moralisBody: MoralisBody = req.body;
    console.log("moralisBody.confirmed", moralisBody.confirmed);
    // only send pending txs
    if (moralisBody.confirmed) return res.status(200).json({ success: true });
    // query streamId from trigger
    const trigger = await prisma.trigger.findUnique({ where: { streamId: moralisBody.streamId } });
    console.log("trigger", trigger);
    // if no trigger, return error
    if (!trigger) return res.status(200).send({ success: false });
    // if no abi then POST transaction
    if (!trigger.abi || trigger.abi.length === 0) {
      const transactionResponse = getTransactionResponse(moralisBody);
      console.log("transactionResponse", transactionResponse);
      fetch(trigger.webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(transactionResponse) });
    }
    // if abi then POST event
    if (trigger.abi) {
      const eventResponse: HookResponse = getEventResponse(trigger.abi, moralisBody);
      fetch(trigger.webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(eventResponse) });
    }
    res.status(200).json({ success: true });
  } catch {
    return res.status(200).send({ success: false });
  }
}

function getTransactionResponse(_moralisBody: MoralisBody): HookResponse {
  return {
    transactionHash: _moralisBody.txs[0].hash,
    fromAddress: _moralisBody.txs[0].fromAddress,
    toAddress: _moralisBody.txs[0].toAddress,
    value: _moralisBody.txs[0].value,
    chainId: parseInt(_moralisBody.chainId, 16).toString(),
    data: _moralisBody.logs[0]?.data || "",
    gasLimit: _moralisBody.txs[0].gas,
  };
}

function getEventResponse(_abi: string, _moralisBody: MoralisBody): HookResponse {
  const hookResponse: HookResponse = { transactionHash: _moralisBody.txs[0].hash };
  const iface = new ethers.utils.Interface(_abi);
  // create empty object for each event
  for (const key in iface.events) {
    const eventName = iface.events[key].name;
    iface.events[key].inputs.forEach((input) => {
      hookResponse[`${eventName}_${input.name}`] = null;
    });
  }
  // convert topic0, topic1 etc to array
  let topics = [];
  for (let topic of ["topic0", "topic1", "topic2", "topic3"]) {
    if (_moralisBody.logs[0][topic as keyof Logs]) {
      topics.push(_moralisBody.logs[0][topic as keyof Logs]);
    }
  }
  const eventSignature = iface.parseLog({ data: _moralisBody.logs[0].data, topics });
  // fill event object with values from eventSignature
  for (const key in eventSignature.args) {
    if (!isNaN(Number(key))) continue;
    const eventName = eventSignature.name;
    hookResponse[`${eventName}_${key}`] = eventSignature.args[key].toString();
  }
  return hookResponse;
}
