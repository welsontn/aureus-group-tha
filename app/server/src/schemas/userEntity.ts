import { z } from "zod";
import {emailSchema} from "./emailSchema";
import {passwordSchema} from "./passwordSchema";
import {roleEnum} from "#src/enums/roleEnum";
import { ObjectId } from "mongodb";

export const userEntitySchema = z.object({
    _id: z.instanceof(ObjectId),
    firstName: z.string().min(1).max(128),
    lastName: z.string().min(1).max(128),
    email: emailSchema,
    password: passwordSchema,
    role: roleEnum,
    appliedJobIds: z.array(z.string()).default([]),
});

export type UserEntity = z.infer<typeof userEntitySchema>
