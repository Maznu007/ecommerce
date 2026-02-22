import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ Re-export authOptions so API routes can use it
export { authOptions };

export default NextAuth(authOptions);