import { env } from "./constants";
import { sign, verify } from "hono/jwt";

export async function generateToken(fields?: object, expiry?: number) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = expiry ? iat + expiry : undefined;
  const payload = { ...fields, iat, exp };
  return await sign(payload, env.JWT_SECRET);
}

export async function verifyToken<T>(token: string) {
  const decoded = await verify(token, env.JWT_SECRET);
  return decoded as T;
}
