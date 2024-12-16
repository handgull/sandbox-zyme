import { facebookLoginRoute, googleLoginRoute } from "./auth.openapi.js";
import { oAuthLogin } from "./auth.service.js";
import { createRouter } from "@/misc/openapi";
import { env } from "@/misc/constants";

const app = createRouter();

app.openapi(facebookLoginRoute, async (c) => {
  const user = c.get("user-facebook");
  const token = await oAuthLogin(user);
  return c.redirect(
    `${env.FRONTEND_URL}/auth/login?accessToken=${token ?? ""}`,
  );
});

app.openapi(googleLoginRoute, async (c) => {
  const user = c.get("user-google");
  const token = await oAuthLogin(user);
  return c.redirect(
    `${env.FRONTEND_URL}/auth/login?accessToken=${token ?? ""}`,
  );
});

export default app;
