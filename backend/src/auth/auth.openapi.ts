import { createRoute } from "@hono/zod-openapi";
import { googleMiddleware } from "./middlewares/google.middleware";
import { facebookMiddleware } from "./middlewares/facebook.middleware";

export const facebookLoginRoute = createRoute({
  method: "get",
  path: "/facebook-login",
  middleware: [facebookMiddleware],
  responses: {
    302: {
      description:
        "Retrieve the token, if the query param is empty the user is not authorized",
    },
  },
});

export const googleLoginRoute = createRoute({
  method: "get",
  path: "/google-login",
  middleware: [googleMiddleware],
  responses: {
    302: {
      description:
        "Retrieve the token, if the query param is empty the user is not authorized",
    },
  },
});
