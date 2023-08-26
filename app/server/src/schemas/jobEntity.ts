import { z } from "zod";
import { ObjectId } from "mongodb";

export const jobEntitySchema = z.object({
    _id: z.instanceof(ObjectId),
    slug: z.string().min(1),
    title: z.string().min(1).max(128),
    imagePath: z.optional(z.string()),
    active: z.boolean(),
    postedAt: z.date(),
    company: z.string(),
    salary: z.optional(
        z.number().refine((val) => val.toFixed(2))
    ),
    description: z.string().min(1).max(660),
});

export type JobEntity = z.infer<typeof jobEntitySchema>
