import { OpenAPIHono } from "@hono/zod-openapi";
import { JwtVariables } from "hono/jwt";
import { env } from "./constants";

export function createRouter() {
  return new OpenAPIHono<{ Variables: JwtVariables }>({
    defaultHook: (result, c) => {
      if (env.NODE_ENV !== "production" && !result.success) {
        return c.json(result, 418);
      }
    },
  });
}
