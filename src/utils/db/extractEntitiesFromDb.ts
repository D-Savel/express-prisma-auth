import { Prisma } from "@prisma/client";
import { Entity } from "../../types/Entity.js";

const entities = Prisma.dmmf.datamodel.models;

const extractEntitiesFromDb = (): Entity[] => {
  let entitiesArray: Entity[] = [];
  for (const entity of entities) {
    entitiesArray = [...entitiesArray, entity.dbName as Entity];
  }
  return entitiesArray;
};

export default extractEntitiesFromDb;