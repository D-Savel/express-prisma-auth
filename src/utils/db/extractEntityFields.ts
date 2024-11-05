import { PrismaClient } from '@prisma/client';
import { Entity } from '../../types/Entity.js';
import extractUniqueKeys from './extractUniqueKeys.js';

const prisma = new PrismaClient();


// extract fields from entity in db
export default async function extractEntityFields(entity: Entity): Promise<string[] | null | undefined> {
  // Fetch a single user to use as a reference (or use an empty object)
  try {
    // @ts-ignore
    const response = await prisma[entity].findFirst();
    const userKeys = response ? Object.keys(response) : [];
    extractUniqueKeys();
    return userKeys; // Outpu ex t: ['id', 'name', 'email', 'createdAt','updatedAt'] for user
  } catch (error) {
    console.log(error);
  }
}
