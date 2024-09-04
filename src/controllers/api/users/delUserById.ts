import { NextFunction, Request, Response } from "express";
import { users } from "../../../datas/users";
import { sendSuccess } from "../../../utils/express/sendSuccess";
import { DatabaseError } from "../../../errors/DatabaseError";
import { delById } from "../../../services/crud/dbRequest";

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await delById(req, 'user');
    console.log('param in del', req.params.id);
    console.log('delete user response', deletedUser);
    if (deletedUser) {
      sendSuccess(res, 200, `User with Id: ${req.params.id} has been successfully deleted`, null);
    } else {
      throw new DatabaseError(`user controller error (delUsersById: No user matches with id ${req.params.id}`);
    }
  } catch (error) {
    return next(error);
  }
};

export default deleteUserById;