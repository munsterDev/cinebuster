import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Set up rate limiter (5 requests per minute per IP)
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(100, "1m"),
});

// Middleware function (Rename from rateLimitMiddleware -> middleware)
export async function middleware(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
  const { success } = await limiter.limit(ip);

  if (!success) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  return NextResponse.next();
}

// Apply middleware to authentication routes only
export const config = {
  matcher: ["/api/auth/:path*"], 
};