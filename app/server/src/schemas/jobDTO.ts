import { z } from "zod";
import { JobEntity, jobEntitySchema } from "./jobEntity";

export const jobDTOSchema = z.object({
    id: z.optional(z.string()),
    slug: z.optional(jobEntitySchema.shape.slug),
    title: jobEntitySchema.shape.title,
    imagePath: jobEntitySchema.shape.imagePath,
    active: jobEntitySchema.shape.active,
    postedAt: z.optional(jobEntitySchema.shape.postedAt),
    company: jobEntitySchema.shape.company,
    salary: jobEntitySchema.shape.salary,
    description: z.optional(z.string().min(1).max(660)),
});

export type JobDTO = z.infer<typeof jobDTOSchema>

// Companion Object Pattern
export const JobDTO = {
    convertFromEntity(entity: JobEntity): JobDTO {
      const candidate: JobDTO = {
        id: entity._id.toHexString(),
        slug: entity.slug,
        title: entity.title,
        imagePath: entity.imagePath,
        active: entity.active,
        postedAt: entity.postedAt,
        company: entity.company,
        salary: entity.salary,
        description: entity.description,
      };
      return jobDTOSchema.parse(candidate);
    },
}