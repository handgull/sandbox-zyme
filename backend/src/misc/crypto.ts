import { createCipheriv, createDecipheriv } from "node:crypto";
import { env } from "./constants";

export function encrypt(value: string) {
  const { ENCRYPTION_KEY, IV_KEY } = env;

  const cipher = createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV_KEY);
  let encrypted = cipher.update(value, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
}

export function decrypt(encrypted: string) {
  const { ENCRYPTION_KEY, IV_KEY } = env;

  const decipher = createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV_KEY);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
