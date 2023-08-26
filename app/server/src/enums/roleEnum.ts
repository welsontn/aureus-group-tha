import { z } from "zod";

const ENUM = ["user", "admin"] as const;
export const roleEnum = z.enum(ENUM);