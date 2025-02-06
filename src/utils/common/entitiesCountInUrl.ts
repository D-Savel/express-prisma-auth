import { Request } from "express";
import extractEntitiesFromDb from "../db/extractEntitiesFromDb.js";
import pluralToSingular from "./pluralToSingular.js";
import { Entity } from "../../types/Entity";

const dbEntities = extractEntitiesFromDb();

console.log('DB ENTITIES in Count entity', dbEntities);


function entitiesCountInUrl(req: Request): number {
  let count: number = 0;
  const urlToStringArray: string[] = req.originalUrl.replace('?', '/').split('/');
  for (const el of urlToStringArray) {
    if (dbEntities.includes(pluralToSingular(el) as Uncapitalize<Entity>)) { count++; }
  }
  return count;
}
export default entitiesCountInUrl;