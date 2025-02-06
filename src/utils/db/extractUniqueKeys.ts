import { Prisma } from '@prisma/client';

// Return an array of objects with entity name as key and unique fields as value
// e.g. [{user: ['email']}, {post: ['id', 'slug']}]
export default function extractUniqueKeys() {
  const entities = Prisma.dmmf.datamodel.models;
  let uniquesByEntities: object[] = [];
  for (const entity of entities) {
    const uniqueFields = (entity.fields.filter(field => field.isUnique === true || field.isId == true)).map(field => field.name);
    uniquesByEntities.push({ [entity.name.toLowerCase()]: uniqueFields });
  }
  console.log('uniqueFields', uniquesByEntities);
  return uniquesByEntities;
}
