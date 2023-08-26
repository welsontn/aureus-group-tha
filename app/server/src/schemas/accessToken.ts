import { z } from "zod";
import {emailSchema} from "./emailSchema";
import {roleEnum} from "#src/enums/roleEnum";

export const accessTokenSchema = z.object({
    id: z.string(),
    iat: z.number().optional(),
    exp: z.number().optional(),
});

export type AccessToken = z.infer<typeof accessTokenSchema>
