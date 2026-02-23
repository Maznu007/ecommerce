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
          image: user.image || ""
        };
      }
    })
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

callbacks: {
  async jwt({ token, user }) {
    // When user logs in, include image
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.image = user.image;
    }

    // Always fetch latest data from database
    const dbUser = await User.findById(token.id);
    if (dbUser) {
      token.name = dbUser.name;
      token.email = dbUser.email;
      token.image = dbUser.image; // ← THIS WAS NOT WORKING BEFORE
    }

    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.name = token.name;
    session.user.email = token.email;
    session.user.image = token.image; // ← THIS is what dashboard uses
    return session;
  },
}
};