import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";

export default async function handle(req, res) {
  await initMongoose();

  const { ids } = req.query;

  if (ids) {
    const idsArray = ids.split(",");

    const products = await Product.find({
      _id: { $in: idsArray },
    }).exec();

    res.json(products);
    return;
  } 
// const abs
  const products = await Product.find().exec();
  res.json(products);
}
