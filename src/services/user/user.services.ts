import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import prisma from "../../utils/db/prismaInstance";

function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

function createUser(userPayload: User): Promise<User> {
  userPayload.password = bcrypt.hashSync(userPayload.password!, 12);
  return prisma.user.create({
    data: userPayload,
  });
}

function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export {
  findUserByEmail,
  findUserById,
  createUser,
};