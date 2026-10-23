import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo } from "hono/bun"; //reads from Bun's native server socket | my own server

const authLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  limit: 50, // only 5 attempts per minute
  keyGenerator: (c) => {
    const forwarded = c.req.header("x-forwarded-for")?.split(",")[0]?.trim();
    const ip =
      c.req.header("cf-connecting-ip") ??
      forwarded ??
      getConnInfo(c).remote.address ??
      "unknown";
    return ip;
  },
});

export { authLimiter };
