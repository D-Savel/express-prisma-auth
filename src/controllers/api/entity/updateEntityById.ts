import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess.js";
import { PrismaClient } from '@prisma/client';
import { updateById } from "../../../services/crud/dbRequest.js";

const prisma = new PrismaClient();


const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateUser = await updateById(req, 'user');

    if (updateUser) {
      sendSuccess(res, 201, `User for Id: ${req.params.id} has been successfully updated`, { user: updateUser });
    }
  } catch (error) {
    return next(error);
  }
};

export default updateUserById;