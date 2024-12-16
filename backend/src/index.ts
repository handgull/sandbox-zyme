import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";
import auth from "@/auth/auth";
import authExceptions from "@/auth/auth-exceptions";
import { env } from "@/misc/constants";
import { StatusCode } from "hono/utils/http-status";
import { GenericErrorRes } from "@/misc/shared-schemas";
import { createRouter } from "@/misc/openapi";

const app = createRouter();

app.use(logger());
app.onError((err, c) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const status: StatusCode | undefined = (err as any).res.status;

  if (status === 401) {
    const res: GenericErrorRes = { error: "Unhautorized!" };
    return c.json(res, 401);
  }

  const res: GenericErrorRes = { error: "Internal Server Error!" };
  return c.json(res, status ?? 500);
});
app.notFound((c) => {
  const res: GenericErrorRes = { error: "Endpoint not found!" };
  return c.json(res, 404);
});
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(async (c, next) => {
  if (!authExceptions.includes(c.req.path)) {
    const middleware = jwt({
      secret: env.JWT_SECRET,
    });
    return middleware(c, next);
  }
  await next();
});

app.route("/auth", auth);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
