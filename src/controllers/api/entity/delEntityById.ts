import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess.js";
import { delById } from "../../../services/crud/dbRequest.js";


const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await delById(req, 'user');
    console.log('param in del', req.params.id);
    console.log('delete user response', deletedUser);
    if (deletedUser) {
      sendSuccess(res, 200, `User with Id: ${req.params.id} has been successfully deleted`, null);
    }
  } catch (error) {
    return next(error);
  }
};

export default deleteById;