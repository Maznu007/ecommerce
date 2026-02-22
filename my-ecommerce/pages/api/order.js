import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  await initMongoose();

  if (req.method === "GET") {
    try {
      const orders = await Order.find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .lean();
      
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  }
}