import { Entity } from '../../types/Entity.js';
import extractUniqueKeys from './extractUniqueKeys.js';
import prisma from './prismaInstance.js';


// extract fields from entity in db
export default async function extractEntityFields(entity: Entity): Promise<string[] | null | undefined> {
  // Fetch a single user to use as a reference (or use an empty object)
  try {
    // @ts-ignore
    const response = await prisma[entity].findFirst();
    console.log('RESPONSE IN extract: ', response);
    const entityKeys = response ? Object.keys(response) : [];
    extractUniqueKeys();
    return entityKeys; // Output ex: ['id', 'name', 'email', 'createdAt','updatedAt'] for user
  } catch (error) {
    console.log(error);
  }
}
