import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  data: boolean;
};

// Only admin can do this. Reset all user credits to 0. Done once a month.
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ data: false });
  await prisma.user.updateMany({
    where: {
      credits: {
        gt: 0,
      },
    },
    data: {
      credits: 0,
    },
  });
  res.status(200).json({ data: true });
}
