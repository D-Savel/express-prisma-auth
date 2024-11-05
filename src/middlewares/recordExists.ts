import { Request, Response, NextFunction } from "express";
import { getRecords } from "../services/crud/dbRequest.js";
import { DuplicateUserError } from "../errors/DuplicateUserError.js";
import isNull from "../utils/common/isNull.js";
import { Entity } from "../types/Entity.js";

const recordExists = (entity: Entity) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getRecords(req);
      console.log('in entity EXISTS', entity);
      console.log('in entity EXISTS response', response);
      if (response!.length == 0) {
        return next();
      } else {
        throw new DuplicateUserError(` ${entity} fields already exists in database`);
      }
    } catch (error) {
      return next(error);
    }
  };
};

export default recordExists;