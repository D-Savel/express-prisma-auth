import { Request, Response, NextFunction } from "express";
import { getById } from "../services/crud/dbRequest.js";
import isNull from "../utils/common/isNull.js";
import { DatabaseError } from "../errors/DatabaseError.js";
import { Prisma } from "@prisma/client";

const entityNotMatches = (entity: Uncapitalize<Prisma.ModelName>) => {



  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getById(req, entity);
      console.log('in entity not matches', entity);
      console.log('in entity not matches response', response);
      if (isNull([response])) {
        throw new DatabaseError(`No ${entity} for request`);
      } else {
        return next();
      }
    } catch (error) {
      return next(error);
    }
  };
};

export default entityNotMatches;