import { Request, Response, NextFunction } from "express";
import getUsers from "../../controllers/api/users/getUsers";

const isQueryString = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.query).length > 0) {
      next();
    } else {
      getUsers(req, res, next);
    };
  } catch (error) {
    return next(error);
  }
};

export default isQueryString;