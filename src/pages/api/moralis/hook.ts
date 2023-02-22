import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import { Trigger } from "@prisma/client";
import { User } from "@prisma/client";
import Stripe from "stripe";
import incrementUsage from "@/utils/incrementUsage";
import getTotalUsage from "@/utils/getTotalUsage";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });

type MoralisBody = {
  confirmed: boolean;
  chainId: string; // hex
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
  chainId?: number;
  data?: string;
  gasLimit?: string;
  [key: string]: any;
};

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/moralis/hook");
    const moralisBody: MoralisBody = req.body;
    // only send pending txs
    if (moralisBody.confirmed) return res.status(200).json({ success: true });
    // get moralis trigger from database
    const trigger = await queryDatabase(moralisBody);
    if (!trigger || !trigger.user.stripe) return res.status(200).send({ success: false });
    const subscriptionItem = await stripe.subscriptionItems.retrieve(trigger.user.stripe);
    const subscription = await stripe.subscriptions.retrieve(subscriptionItem.subscription);
    // if subscription is not active, return error
    if (subscription.status !== "active") return res.status(200).send({ success: false });
    const usage = await getTotalUsage(trigger.user.stripe);
    // if usage is over && no credit card, return error
    if (usage > 1000 && !subscription.default_payment_method) return res.status(200).send({ success: false });
    // if no abi then POST transaction
    if (!trigger.abi || trigger.abi.length === 0) {
      const transactionResponse: HookResponse = getTransactionResponse(moralisBody);
      await incrementUsage(trigger.user.stripe);
      await axios.post(trigger.webhookUrl, transactionResponse);
    }
    // if abi then POST event
    if (trigger.abi && trigger.event) {
      const eventResponse: HookResponse = getEventResponse(trigger, moralisBody);
      await incrementUsage(trigger.user.stripe);
      await axios.post(trigger.webhookUrl, eventResponse);
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ success: false });
  }
}

async function queryDatabase(_moralisBody: MoralisBody): Promise<(Trigger & { user: User }) | null> {
  const data = await prisma.trigger.findFirst({
    where: {
      streamId: _moralisBody.streamId,
    },
    include: {
      user: true,
    },
  });
  return data;
}

function getTransactionResponse(_moralisBody: MoralisBody): HookResponse {
  return {
    transactionHash: _moralisBody.txs[0].hash,
    fromAddress: _moralisBody.txs[0].fromAddress,
    toAddress: _moralisBody.txs[0].toAddress,
    value: _moralisBody.txs[0].value,
    chainId: parseInt(_moralisBody.chainId, 16),
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
