import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      console.log("❌ No session found");
      return res.status(401).json({ error: "Not authenticated" });
    }

    console.log("✅ Session user ID:", session.user.id);

    await initMongoose();

    const { oldPassword, newPassword } = req.body;
    
    console.log("📨 Received oldPassword:", oldPassword);
    console.log("📨 Received newPassword length:", newPassword?.length);

    const user = await User.findById(session.user.id);
    
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ Found user:", user.email);
    console.log("🔐 Stored password hash:", user.password);
    console.log("🔐 Hash starts with:", user.password.substring(0, 7));
    
    // Test bcrypt compare
    console.log("🧪 Testing bcrypt.compare...");
    const isValid = await bcrypt.compare(oldPassword, user.password);
    
    console.log("🧪 bcrypt.compare result:", isValid);
    
    // If failed, let's test why
    if (!isValid) {
      console.log("❌ Password comparison failed");
      
      // Test: Hash the provided password and compare hashes
      const testHash = await bcrypt.hash(oldPassword, 12);
      console.log("🧪 Test hash of provided password:", testHash);
      console.log("🧪 Hashes match?", testHash === user.password);
      
      // Try with different bcrypt versions
      const isValid2 = await bcrypt.compare(oldPassword.trim(), user.password);
      console.log("🧪 Compare with trim:", isValid2);
      
      return res.status(400).json({ 
        error: "Current password is incorrect",
        debug: {
          providedLength: oldPassword.length,
          hashLength: user.password.length,
          hashPrefix: user.password.substring(0, 10)
        }
      });
    }

    console.log("✅ Password matched! Updating...");
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await User.findByIdAndUpdate(session.user.id, {
      password: hashedPassword
    });

    console.log("✅ Password updated successfully");
    res.status(200).json({ message: "Password updated successfully" });
    
  } catch (error) {
    console.error("💥 Password update error:", error);
    res.status(500).json({ error: "Failed to update password: " + error.message });
  }
}