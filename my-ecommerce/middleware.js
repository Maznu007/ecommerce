import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if user is admin
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.email !== "admin@yourdomain.com") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.email === "admin@yourdomain.com";
        }
        return token !== null;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/checkout", "/orders", "/wishlist"],
};