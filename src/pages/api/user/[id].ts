import { NextApiRequest, NextApiResponse } from "next";
import users from "@/data/users.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const numericId = parseInt(id as string, 10);
  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const user = users[numericId - 1];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(user);
}
