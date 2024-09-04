import { Request, Response, NextFunction } from "express";
import { getByOneParam } from "../../../services/crud/dbRequest";
import { DuplicateUserError } from "../../../errors/DuplicateUserError";

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getByOneParam(req, 'user');
    console.log('user in UserExists', user);
    console.log('URL', req.url);
    const urlRequest = req.url;
    if (user) {
      if (urlRequest.replace('/api/users', '') !== '') // verify if id in path and next
      {
        return next();
      } else {
        throw new DuplicateUserError(`User with email:${user.email} already exists`);
      }
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

export default userExists;