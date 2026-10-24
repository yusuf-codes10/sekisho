import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo } from "hono/bun";

const authLimiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 50,
  keyGenerator: (c) => {
    const forwarded = c.req.header("x-forwarded-for")?.split(",")[0]?.trim();
    const ip =
      c.req.header("cf-connecting-ip") ??
      forwarded ??
      getConnInfo(c).remote.address ??
      "unknown";
    console.log("[sekisho limiter] key:", ip, c.req.method, c.req.path);
    return ip;
  },
  handler: (c) => {
    console.log("[sekisho limiter] BLOCKED", c.req.method, c.req.path);
    return c.json({ msg: "RATE LIMITED BY SEKISHO" }, 429);
  },
});

export { authLimiter };