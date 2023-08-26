import { z } from "zod";
import {UserEntity, userEntitySchema} from "./userEntity";

export const userDTOSchema = z.object({
    id: z.optional(z.string()),
    firstName: userEntitySchema.shape.firstName,
    lastName: userEntitySchema.shape.lastName,
    email: userEntitySchema.shape.email,
    password: z.optional(userEntitySchema.shape.password),
    role: userEntitySchema.shape.role,
});

export type UserDTO = z.infer<typeof userDTOSchema>
// Companion Object Pattern
export const UserDTO = {
    convertFromEntity(entity: Omit<UserEntity, "password" | "appliedJobIds">): UserDTO {
      const candidate: UserDTO = {
        id: entity._id.toHexString(),
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        role: entity.role,
      };
      return userDTOSchema.parse(candidate);
    },
}

// Allow conversion into UserDTO with password
export type UserDTOWithPassword = z.infer<typeof userDTOSchema>
export const UserDTOWithPassword = {
    convertFromEntity(entity: Omit<UserEntity, "appliedJobIds">): UserDTOWithPassword {
      const candidate: UserDTO = {
        id: entity._id.toHexString(),
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        password: entity.password,
        role: entity.role,
      };
      return userDTOSchema.parse(candidate);
    },
}