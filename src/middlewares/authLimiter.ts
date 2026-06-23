import { rateLimiter } from "hono-rate-limiter";

const authLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  limit: 5, // only 5 attempts per minute
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown",
});

export {authLimiter};
