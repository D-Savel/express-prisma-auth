import { Request } from "express";
import entitiesFromRequest from "../common/entitiesFromRequest.js";
import extractUniqueKeys from "../db/extractUniqueKeys.js";

function queryPrismaArray(queryKeys: object, pathRequest: object, req?: Request): object[] {
  let queryArray: object[] = [];
  if (Object.keys(queryKeys).length > 0) {
    for (const [key, value] of Object.entries(queryKeys)) {
      if ((value as string).includes(',')) {
        const valueArray = (value as string).split(',');
        for (const subValue of valueArray) {
          queryArray = [...queryArray, { [`${key}`]: subValue }];
        }
      } else {
        queryArray = [...queryArray, { [`${key}`]: value }];
      }
    }
  }

  if (req?.body.payload) {
    const entities = entitiesFromRequest(req!);
    const uniqueKeysForEntities = extractUniqueKeys();
    let [uniqueKeysForEntity]: string[] = Object.values(uniqueKeysForEntities.filter(entity => Object.keys(entity).includes(entities.singular?.primaryEntity as string))[0]);
    //if (req && (req.method === 'PATCH' || req.method === 'POST')) {
    //   if (req.method === 'PATCH') {
    //     const idIndex = (uniqueKeysForEntities as unknown as string[]).indexOf('id');
    //     uniqueKeysForEntities.splice(idIndex, 1);
    //   }
    // }
    // console.log('uniqueKeysForEntity IN QUERY PRISMA ARRAY', uniqueKeysForEntity);
    for (const [key, value] of Object.entries(req.body.payload)) {
      console.log('UNIQUE KEYS in QUERY loop', key);
      console.log('KEYS FOR ENTITY', uniqueKeysForEntity);
      console.log('condition: uniqueKeysForEntity.indexOf(key.toString()', uniqueKeysForEntity.indexOf(key));
      if (uniqueKeysForEntity.indexOf(key) > -1)
        queryArray = [...queryArray, { [`${key}`]: value }];
    }
  }

  console.log('PATH REQUEST IN QUERYPRISMA ARRAY: ', pathRequest);
  if (pathRequest) {
    queryArray = [...queryArray, pathRequest!];
  }
  return queryArray;
}

export default queryPrismaArray;