import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess";
import { DatabaseError } from "../../../errors/DatabaseError";
import { getByOneParam } from "../../../services/crud/dbRequest";

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getByOneParam(req, 'user');
    if (user) {
      sendSuccess(res, 200, `User info for ID: ${req.params.id} successfully retreived`, { user });
    } else {
      throw new DatabaseError(`{user controller error (getUsersById: No user matches with id ${req.params.id})`);
    }
  } catch (error) {
    return next(error);
  }
};

export default getUserById;