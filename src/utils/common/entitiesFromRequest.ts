
import { Request } from "express";
import { Entities } from "../../types/Entities.js";
import { Entity } from "../../types/Entity.js";
import entitiesCountInUrl from "./entitiesCountInUrl.js";
import pluralToSingular from "./pluralToSingular.js";
import extractEntitiesFromDb from "../db/extractEntitiesFromDb.js";

let entities: Entities;

function entitiesFromRequest(req: Request): Entities {

  const dbEntities = extractEntitiesFromDb();
  const urlToStringArray = req.originalUrl.replace('?', '/').split('/');
  let urlEntities: Entity[] = [];



  for (const string of urlToStringArray) {
    if (dbEntities.includes(pluralToSingular(string) as Uncapitalize<Entity>)) {
      urlEntities = [...urlEntities, (string) as Entity];
    }
  }

  console.log('URL ARRAY', urlToStringArray);
  console.log('count ENTITIES', entitiesCountInUrl(req));


  if (entitiesCountInUrl(req) > 1) {
    entities = {
      plural:
      {
        primaryEntity: urlEntities[1] as Entity,
        secondaryEntity: urlEntities[0] as Entity
      },
      singular:
      {
        primaryEntity: pluralToSingular(urlEntities[1]) as Entity,
        secondaryEntity: pluralToSingular(urlEntities[0]) as Entity
      }
    };
  } else {
    entities = {
      plural:
      {
        primaryEntity: urlEntities[0] as Entity,
        secondaryEntity: null
      },
      singular:
      {
        primaryEntity: pluralToSingular(urlEntities[0]) as Entity,
        secondaryEntity: null
      }
    };
  }
  console.log('Entities in Entities from REQ', entities);
  return entities;
}


export default entitiesFromRequest;