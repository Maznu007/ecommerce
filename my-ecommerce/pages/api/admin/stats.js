import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session || session.user.email !== "admin@yourdomain.com") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await initMongoose();

  const [totalOrders, totalProducts, totalUsers, orders] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments(),
    Order.find()
  ]);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  res.status(200).json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue
  });
}