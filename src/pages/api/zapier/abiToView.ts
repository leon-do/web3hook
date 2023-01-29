import type { NextApiRequest, NextApiResponse } from "next";

// { key: 'Method', children: [ { key: 'balanceOf_account', type: 'string', helpText: "address" }]}
type View = {
  key: string;
  children: {
    key: string;
    type: string;
    helpText: string;
  }[];
};

type Error = {};

type ABI = {
  stateMutability: string;
  name: string;
  inputs: {
    type: string;
    name: string;
  }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<View | Error>) {
  try {
    console.log("/zapier/abiToView");
    const abi: ABI[] = JSON.parse(req.body.abi);
    const view: View = getView(abi);
    return res.status(200).send(view);
  } catch (err) {
    console.log(err);
    return res.status(400).send({});
  }
}

// { key: 'Method', children: [ { key: 'balanceOf_account', type: 'string', helpText: "address" }]}
function getView(_abi: ABI[]): View {
  const response: View = { key: "methods", children: [] };
  const views = _abi.filter((item) => item.stateMutability === "view");
  for (let view of views) {
    response.children.push({
      key: view.name,
      type: "copy",
      helpText: view.name,
    });
    const child = view.inputs.map((input) => ({
      key: `${view.name}_${input.name}_${input.type}`,
      type: "string",
      helpText: input.type,
    }));
    response.children.push(...child);
  }
  return response;
}
