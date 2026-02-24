import Order from "@/models/Order";
import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.email !== "admin@yourdomain.com") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await initMongoose();

  if (req.method === "GET") {
    // Get a single order
    if (req.query.id) {
      const order = await Order.findById(req.query.id);
      return res.status(200).json(order);
    }

    // Get all orders
    const orders = await Order.find();
    return res.status(200).json(orders);
  }

  return res.status(405).json({ error: "Method not allowed" });
}