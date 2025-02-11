import { Request, Response, NextFunction } from "express";
import { getRecords } from "../services/crud/dbRequest.js";
import { DuplicateRecordError } from "../errors/DuplicateUserError.js";
import { Entity } from "../types/Entity.js";
import pluralToSingular from "../utils/common/pluralToSingular.js";
import capitalizeFirstLetter from "../utils/common/capitalizeFirstLetter.js";
import { DatabaseError } from "../errors/DatabaseError.js";

const recordExists = (entity: Entity) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getRecords(req, 'recordExists');
      console.log('in entity EXISTS', entity);
      console.log('in entity EXISTS response', response);
      if (response!.length === 0 && req.method == 'POST' && req.originalUrl.includes('register')) {
        return next();
      } else if (response!.length > 0 && req.method == 'POST' && req.originalUrl.includes('login')) {
        return next();
      } else if (response!.length === 0 && req.method === 'PATCH' || req.method === 'PUT') {
        return next();
      } else if (req.method == 'POST' && req.originalUrl.includes('register')) {
        throw new DuplicateRecordError(`${capitalizeFirstLetter(entity)} already exists in database with some unique field/record value`, entity);
      } else if (req.method == 'POST' && req.originalUrl.includes('login')) {
        throw new DuplicateRecordError(`Invalid ${capitalizeFirstLetter(entity)} login credential`, entity);
      }
    } catch (error) {
      return next(error);
    }
  };
};

export default recordExists;