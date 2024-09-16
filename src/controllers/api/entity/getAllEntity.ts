import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    if (users) {
      sendSuccess(res, 200, `Users list successfully retreived`, { users: users });
    }
  } catch (error) {
    return next(error);
  }
};

export default getUsers;