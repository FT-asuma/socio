import NextAuth from "next-auth";
import authConfig from "./config/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.AUTH_SECRET
});
