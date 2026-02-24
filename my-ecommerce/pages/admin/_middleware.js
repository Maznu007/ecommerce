import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Not logged in → redirect to login
  if (!token) {
    return Response.redirect(new URL("/account/login", req.url));
  }

  // Not admin → block access
  if (token.email !== "admin@yourdomain.com") {
    return Response.redirect(new URL("/", req.url));
  }

  return null; // allow access
}