import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  id: string;
};

type ErrorResponse = {
  success: boolean;
};

type ABI = {
  type: string;
  name: string;
  inputs: { type: string }[];
};

/*
  User input abi, return events
  curl --location --request POST 'localhost:3000/api/zapier/unsubscribe?api_key=123&hook_url=https://hooks.zapier.com/hooks/catch/13294804/bjvjza5' 
*/
export default function handler(req: NextApiRequest, res: NextApiResponse<Data[] | ErrorResponse>) {
  try {
    console.log("/zapier/abiToEvents", req.body);
    const response: Data[] = abiToEvents(JSON.parse(req.body.abi as unknown as string) as ABI[]);
    return res.status(200).json(response);
  } catch {
    return res.status(400).send({ success: false });
  }
}

const abiToEvents = (abi: ABI[]): Data[] => {
  const events = abi.filter((item) => item.type === "event");
  const response: Data[] = events.map((item) => ({
    name: item.name,
    id: `${item.name}(${item.inputs.map((input) => input.type).join(",")})`,
  }));
  return response;
};
