import { z } from "zod";

export const loginResSchema = z
  .object({
    accessToken: z.string(),
  })
  .strict();

export const genericMessageResSchema = z
  .object({
    message: z.string(),
  })
  .strict();

export type LoginRes = z.infer<typeof loginResSchema>;
export type GenericMessageRes = z.infer<typeof genericMessageResSchema>;
