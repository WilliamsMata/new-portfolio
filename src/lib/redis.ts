import "server-only";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = Redis.fromEnv();

export const oneHourRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "1 h"),
});

export const dayRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 d"),
});
