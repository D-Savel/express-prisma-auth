import { PrismaClient } from '@prisma/client';
import capitalizeFirstLetter from '../common/capitalizeFirstLetter.js';

const prisma = new PrismaClient();



const john = async () => {
  const username = 'johnny';
  try {
    const isJohn = await prisma.user.findMany({
      where: {
        username: capitalizeFirstLetter(username)
      },
    });
    if (isJohn.length === 0) {
      await prisma.user.create({
        data: {
          "id": "6127b1a7-edf4-491f-af40-ea5b9495d3d1",
          "username": "Johnny",
          "email": "johnny@mail.me",
          "password": "!1234Johnny#"
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
  const username = 'bob';
  try {
    const isBob = await prisma.user.findMany({
      where: {
        username: capitalizeFirstLetter(username)
      },
    });
    if (isBob.length === 0) {
      await prisma.user.create({
        data: {
          id: 'ea528b18-275a-4506-a23f-59a8e2aeff87',
          email: `${username}@mail.me`,
          username: capitalizeFirstLetter(username),
          password: `1234${username}#`,
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
  const username = 'emma';
  try {
    const isEmma = await prisma.user.findMany({
      where: {
        username: capitalizeFirstLetter(username)
      },
    });
    if (isEmma.length === 0) {
      await prisma.user.create({
        data: {
          id: 'fd8234f3-31e5-4b3e-9e48-99dddf8a55c6',
          email: `${username}@mail.me`,
          username: capitalizeFirstLetter(username),
          password: `1234L${username}$`
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
  const username = 'johnny';
  try {
    const isJohnny = await prisma.user.findMany({
      where: {
        username: capitalizeFirstLetter(username)
      },
    });
    if (isJohnny.length === 0) {
      await prisma.user.create({
        data: {
          id: '6127b1a7-edf4-491f-af40-ea5b9495d3d8',
          email: `${username}@mail.me`,
          username: capitalizeFirstLetter(username),
          password: `${username}Password`

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
  john(),
  bob(),
  emma(),
  //johnny()
];


const seedDb = async () => {
  Promise.all([promises]);
};


export default seedDb;