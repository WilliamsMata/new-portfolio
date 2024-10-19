import "server-only";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: "https://awake-wallaby-26482.upstash.io",
  token: process.env.IOREDIS_TOKEN!,
});

export const oneHourRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "1 h"),
});

export const dayRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 d"),
});
