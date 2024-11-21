import { Request, Response, NextFunction } from "express";
import { getRecords } from "../services/crud/dbRequest.js";
import { DatabaseError } from "../errors/DatabaseError.js";
import { Entity } from "../types/Entity.js";
import entitiesFromRequest from "../utils/common/entitiesFromRequest.js";

const noRecordForId = (entity: Entity) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const entities = entitiesFromRequest(req); // DB entities object in lowercase
    console.log('in No record For Id,  Primary entity =>', entities.singular!.primaryEntity
    );
    console.log('in No record For Id,  Secondary entity =>', entities.singular!.secondaryEntity
    );
    try {
      const response = await getRecords(req);
      if (response?.length === 0) {
        throw new DatabaseError(`No ${entity} for request`);
      } else {
        console.log('get out no record for Id');
        next();
      }
    } catch (error) {
      return next(error);
    }
  };
};

export default noRecordForId;