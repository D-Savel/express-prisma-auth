import { Prisma } from "@prisma/client";

function entityPrismaModel(entityName: string) {
  return Prisma.dmmf.datamodel.models.find(entity => entity.dbName === entityName);// get entity model in prisma schema;
}

export default entityPrismaModel;