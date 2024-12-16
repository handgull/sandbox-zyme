import { env } from "@/misc/constants";
import { googleAuth } from "@hono/oauth-providers/google";

export const googleMiddleware = googleAuth({
  client_id: env.GOOGLE_ID,
  client_secret: env.GOOGLE_SECRET,
  scope: ["openid", "email", "profile"],
});
