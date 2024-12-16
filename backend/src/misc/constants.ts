import { envSchema } from "@/configs";

export const env = envSchema.parse(process.env);
