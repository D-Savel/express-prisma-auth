import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess";
import { create } from "../../../services/crud/dbRequest";
import capitalizedUsername from "../../../utils/user/capitalizedUsername";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { payload } = req.body;
    const createdUser = await create(req, 'user');
    sendSuccess(res, 201, `User ${capitalizedUsername(payload.username)} successfully created`, { user: createdUser });
  } catch (error) {
    console.log(error);
  }
};

export default createUser;