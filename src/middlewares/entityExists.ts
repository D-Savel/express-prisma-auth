import { Request, Response, NextFunction } from "express";
import { getOneByOneParam } from "../services/crud/dbRequest.js";
import { DuplicateUserError } from "../errors/DuplicateUserError.js";
import isNull from "../utils/common/isNull.js";
import { Prisma } from "@prisma/client";

const entityExists = (entity: Uncapitalize<Prisma.ModelName>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getOneByOneParam(req, entity);
      console.log('in entity EXISTS', entity);
      console.log('in entity EXISTS response', response);
      if (isNull([response])) {
        return next();
      } else {
        throw new DuplicateUserError(`${entity} already exists`);
      }
    } catch (error) {
      return next(error);
    }
  };
};

export default entityExists;