import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  await initMongoose();

  const userId = session.user.id;

  // 🔵 GET — fetch all addresses
  if (req.method === "GET") {
    const user = await User.findById(userId).lean();

    return res.status(200).json({
      addresses: user.addresses || []
    });
  }

  // 🟢 POST — add new address
  if (req.method === "POST") {
    const { street, city, postalCode, country, isDefault } = req.body;

    if (!street || !city || !postalCode || !country) {
      return res.status(400).json({ error: "All fields required" });
    }

    const update = {
      $push: {
        addresses: {
          street,
          city,
          postalCode,
          country,
          isDefault: !!isDefault
        }
      }
    };

    await User.findByIdAndUpdate(userId, update);

    return res.status(201).json({ message: "Address added successfully" });
  }

  // 🔴 DELETE — remove address
  if (req.method === "DELETE") {
    const { id } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { addresses: { _id: id } }
    });

    return res.status(200).json({ message: "Address removed" });
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}