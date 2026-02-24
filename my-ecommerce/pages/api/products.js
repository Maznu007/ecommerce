import Product from "@/models/Product";
import { initMongoose } from "@/lib/mongoose";

export default async function handler(req, res) {
  await initMongoose();

  if (req.method === "GET") {
    if (req.query.id) {
      const product = await Product.findById(req.query.id);
      return res.json(product);
    }
    const products = await Product.find();
    return res.json(products);
  }

  if (req.method === "POST") {
    const product = await Product.create(req.body);
    return res.json(product);
  }

  if (req.method === "PUT") {
    const { _id, ...data } = req.body;
    const updated = await Product.findByIdAndUpdate(_id, data, { new: true });
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await Product.findByIdAndDelete(req.query.id);
    return res.json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}