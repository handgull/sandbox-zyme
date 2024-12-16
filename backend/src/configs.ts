import { z } from "@hono/zod-openapi";

export const envSchema = z.object({
  CORS_ORIGIN: z.string().default("*"),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string().url(),
  ENCRYPTION_KEY: z.string(),
  IV_KEY: z.string(),
  FACEBOOK_ID: z.string(),
  FACEBOOK_SECRET: z.string(),
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
});
