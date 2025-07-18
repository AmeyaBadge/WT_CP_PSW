import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  const { isAuthenticated, sessionClaims } = await auth();

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const role = sessionClaims?.metadata?.role;

  // If logged in but not authorized
  if (role !== "admin" && role !== "moderator") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // If authenticated and authorized, do nothing (let request continue)
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
