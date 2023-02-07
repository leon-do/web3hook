import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Trigger } from "@prisma/client";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

type ABI = {
  name: string;
  type: string;
  inputs: {
    type: string;
  }[];
};

type Body = {
  webhookUrl: string;
  chainId: string;
  address: string;
  abi: string;
};

// https://platform.zapier.com/docs/triggers#subscribe
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/zapier/subscribe");
    // query database for user with api_key
    const user = await prisma.user.findUnique({ where: { apiKey: req.headers["x-api-key"] as string } });
    // if no user, return error
    if (!user) return res.status(400).send({ success: false });
    // define Trigger to insert
    const trigger: Trigger = {
      userId: user.id as string,
      webhookUrl: req.body.webhookUrl as string,
      chainId: Number(req.body.chainId) as number,
      address: req.body.address.toLowerCase() as string,
      abi: req.body.abi as string,
      streamId: await moralisAdd(req.body),
    };
    // insert to transaction database
    await prisma.trigger.create({ data: trigger });
    return res.status(200).redirect(req.body.webhookUrl as string);
  } catch {
    return res.status(400).send({ success: false });
  }
}

async function moralisAdd(_body: Body): Promise<string> {
  const chains = {
    "1": EvmChain.ETHEREUM,
    "5": EvmChain.GOERLI,
    "137": EvmChain.POLYGON,
    "80001": EvmChain.MUMBAI,
    "56": EvmChain.BSC,
    "97": EvmChain.BSC_TESTNET,
    "43114": EvmChain.AVALANCHE,
    "43113": EvmChain.FUJI,
    "250": EvmChain.FANTOM,
    "25": EvmChain.CRONOS,
    "338": EvmChain.CRONOS_TESTNET,
    "11297108109": EvmChain.PALM,
    "42161": EvmChain.ARBITRUM,
  };

  try {
    // https://docs.moralis.io/streams-api/how-to-listen-to-all-erc20-contract-transfers-over-certain-amount-sent-by-specific-address#programmatically
    const stream = await Moralis.Streams.add({
      chains: [chains[_body.chainId as keyof typeof chains]],
      description: _body.webhookUrl,
      tag: _body.webhookUrl,
      abi: JSON.parse(_body.abi),
      topic0: getTopics(JSON.parse(_body.abi)),
      webhookUrl: "https://web3hook.com/api/moralis",
      includeContractLogs: true,
      includeNativeTxs: true,
      includeInternalTxs: true,
    });
    const { id } = stream.toJSON();
    await Moralis.Streams.addAddress({
      id,
      address: _body.address,
    });
    return id;
  } catch {
    return "";
  }
}

function getTopics(_abi: ABI[]): string[] {
  const events = _abi.filter((event) => event.type === "event");
  const topics = events.map((event) => {
    const inputs = event.inputs.map((input) => input.type).join(",");
    return `${event.name}(${inputs})`;
  });
  return topics;
}
