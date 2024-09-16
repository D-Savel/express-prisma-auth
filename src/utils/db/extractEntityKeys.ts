import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function extractEntityKeys(entity: Uncapitalize<Prisma.ModelName>): Promise<string[] | null | undefined> {
  // Fetch a single user to use as a reference (or use an empty object)
  try {
    const response = await prisma[entity].findFirst();
    const userKeys = response ? Object.keys(response) : [];
    return userKeys; // Output: ['id', 'name', 'email', 'createdAt']
    // Use Object.keys() to dynamically extract the keys from the user object
  } catch (error) {
    console.log(error);
  }
}
