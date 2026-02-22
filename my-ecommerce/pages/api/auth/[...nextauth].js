import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// 🔥 REQUIRED EXPORT so other API routes can import authOptions
export { authOptions };

export default NextAuth(authOptions);