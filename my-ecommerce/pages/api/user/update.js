import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    await initMongoose();
    
    const { name } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name },
      { new: true }
    );

    res.status(200).json({ 
      message: "Profile updated",
      user: updatedUser 
    });
    
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
}