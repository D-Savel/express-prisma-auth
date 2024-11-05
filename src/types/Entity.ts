import { Prisma } from "@prisma/client";

export type Entity = Uncapitalize<Prisma.ModelName>;
