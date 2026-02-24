import User from "@/models/User";
import { initMongoose } from "@/lib/mongoose";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  // Only admin can access
  if (!session || session.user.email !== "admin@yourdomain.com") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await initMongoose();

  const users = await User.find({}, "name email"); // only return name & email
  return res.status(200).json(users);
}