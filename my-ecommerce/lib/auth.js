import CredentialsProvider from "next-auth/providers/credentials";
import { initMongoose } from "./mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await initMongoose();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      }
    })
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  // ✅ ADD THIS
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // store user id in token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id; // expose id in session
      }
      return session;
    }
  }
};