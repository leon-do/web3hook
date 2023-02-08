import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import { Trigger } from "@prisma/client";
import { User } from "@prisma/client";

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
  console.log("/moralis/hook");
  try {
    const moralisBody: MoralisBody = req.body;
    // only send pending txs
    if (moralisBody.confirmed) return res.status(200).json({ success: true });
    // get trigger with moralis' streamId
    const trigger = await prisma.trigger.findUnique({ where: { streamId: moralisBody.streamId } });
    // if no trigger, return error
    if (!trigger) return res.status(200).send({ success: false });
    // if no abi then POST transaction
    if (!trigger.abi || trigger.abi.length === 0) {
      const transactionResponse = getTransactionResponse(moralisBody);
      await axios.post(trigger.webhookUrl, transactionResponse);
      await incrementCredits(trigger);
    }
    // if abi then POST event
    if (trigger.abi && trigger.event) {
      const eventResponse: HookResponse = getEventResponse(trigger, moralisBody);
      await axios.post(trigger.webhookUrl, eventResponse);
      await incrementCredits(trigger);
    }
    return res.status(200).json({ success: true });
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

function getEventResponse(_trigger: Trigger, _moralisBody: MoralisBody): HookResponse {
  if (!_trigger.abi || !_trigger.event) throw new Error("No ABI | No Event");
  const hookResponse: HookResponse = { transactionHash: _moralisBody.txs[0].hash };
  const iface = new ethers.utils.Interface(_trigger.abi);
  // create empty object for each event
  const eventName = iface.events[_trigger.event].name;
  iface.events[_trigger.event].inputs.forEach((input) => {
    hookResponse[`${eventName}_${input.name}`] = null;
  });
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

async function incrementCredits(_trigger: Trigger): Promise<User> {
  return await prisma.user.update({
    where: {
      id: _trigger.userId,
    },
    data: {
      credits: {
        increment: 1,
      },
    },
  });
}
