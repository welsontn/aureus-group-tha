import { z } from "zod";

export const tokenResponseSchema = z.object({
    status: z.number(),
    token: z.string(),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>
