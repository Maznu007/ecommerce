import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    await initMongoose();

    const { name, image } = req.body;

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, image },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user
    });

  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile" });
  }
}