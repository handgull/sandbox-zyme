import { generateToken } from "@/misc/jwt";
import { FacebookUser } from "@hono/oauth-providers/facebook";
import { GoogleUser } from "@hono/oauth-providers/google";

export async function oAuthLogin(
  oauthUser?: Partial<FacebookUser | GoogleUser>,
) {
  if (oauthUser?.email) {
    return await generateToken({ id: 1 });
  }
}
