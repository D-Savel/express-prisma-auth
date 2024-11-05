import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*  Extract id field and unique fields in entities
*/
export default function extractUniqueKeys() {
  const entities = Prisma.dmmf.datamodel.models;
  let uniquesByEntities: any = [];
  for (const entity of entities) {
    const uniqueFields = (entity.fields.filter(field => field.isUnique === true || field.isId == true)).map(field => field.name);
    uniquesByEntities.push({ [entity.name.toLowerCase()]: uniqueFields });
    console.log('uniqueFields', uniquesByEntities);
  }
  return uniquesByEntities;
}
