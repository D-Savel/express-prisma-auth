import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const prisma = new PrismaClient();



const john = async () => {
  const password = '!1234John%';
  try {
    const isJohn = await prisma.user.findMany({
      where: {
        password,
      },
    });
    console.log('John', isJohn);
    if (isJohn.length > 0) {
      await prisma.user.deleteMany({
        where: {
          password: password
        }
      });
    }
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const bob = async () => {
  const name = 'Bob';
  try {
    const isBob = await prisma.user.findMany({
      where: {
        username: name,
      },
    });
    if (isBob.length === 0) {
      await prisma.user.create({
        data: {
          id: 'ea528b18-275a-4506-a23f-59a8e2aeff87',
          email: `${name}@mail.me`,
          username: name,
          password: `1234${name}#`
        }
      });
    }
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};


const emma = async () => {
  const name = 'Emma';
  try {
    const isEmma = await prisma.user.findMany({
      where: {
        username: name,
      },
    });
    if (isEmma.length === 0) {
      await prisma.user.create({
        data: {
          id: 'fd8234f3-31e5-4b3e-9e48-99dddf8a55c6',
          email: `${name}@mail.me`,
          username: name,
          password: `1234L${name}$`
        }
      });
    }
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const johnny = async () => {
  const name = 'Johnny';
  try {
    const isJohnny = await prisma.user.findMany({
      where: {
        username: 'Johnny',
      },
    });
    if (isJohnny.length === 0) {
      await prisma.user.create({
        data: {
          id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0',
          email: `${name}@mail.me`,
          username: name,
          password: `${name}Password`

        }
      });
    }
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const promises = [
  bob(),
  emma(),
  johnny()
];


const dbSeed = async () => {
  Promise.all([promises]);
};


export default dbSeed;