import { Request } from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import { Entity } from "../../types/Entity.js";
import capitalizeFirstLetter from "../../utils/common/capitalizeFirstLetter.js";
import { randomUUID } from "crypto";
import extractUniqueKeys from "../../utils/db/extractUniqueKeys.js";
import entitiesFromRequest from "../../utils/common/entitiesFromRequest.js";
import fieldsToPrismaSelect from "../../utils/prisma/fieldsToPrismaSelect.js";
import entityPrismaModel from "../../utils/db/getEntityPrismaModel.js";
import entitiesCountInUrl from "../../utils/common/entitiesCountInUrl.js";
import { stringify } from "querystring";
import queryPrismaArray from "../../utils/prisma/queryPrismaArray.js";
import { RequestValidationError } from "../../errors/RequestValidationError.js";

const prisma = new PrismaClient();

/* Create record with method POST*/
const create = async (req: Request): Promise<any> => {
  try {
    const entities = entitiesFromRequest(req); // DB entities object in lowercase
    if (entities.singular) {
      const randomId = randomUUID();
      let { payload } = req.body;
      payload = { ...payload, username: capitalizeFirstLetter(payload.username), id: !payload.id ? randomId : payload.id };
      // @ts-ignore
      const createdData: Entity = await prisma[entities.singular!.primaryEntity].create({
        data: payload
      });
      return createdData;
    }
  } catch (error) {
    console.log(error);
  }
};

/* Update record with method PATCH*/
const updateById = async (req: Request): Promise<Entity | null | undefined> => {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  try {
    let { payload } = req.body;
    payload = { ...payload, username: capitalizeFirstLetter(payload.username) };
    // @ts-ignore
    const data = await prisma[entities.singular!.primaryEntity].update({
      where: { id: req.params.id }
      ,
      data: payload
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* Delete record with method DELETE*/
const delById = async (req: Request): Promise<Entity | null | undefined> => {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  try {
    // @ts-ignore
    const deletedData = await prisma[entities.singular!.primaryEntity].delete({
      where: {
        id: req.params.id,
      },
    });
    return deletedData;
  } catch (error) {
    console.log(error);
  }
};

const getRecords = async (req: Request): Promise<Entity | null | undefined> => {
  let fieldsPrismaObject: object | null; // formated fields(keys) for database 'prisma' request from 'fields' query string
  let queryOrPrismaArray: object[] = []; // formated query for database 'prisma' request
  let takePrismaObject: { take: number; } = { take: 10 };  // formated limit value for database 'prisma' request
  let pathRequest: {} | null = null; // param path in request
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  // attrib path param if request with Foreign Key (with secondary entity)
  const { fields, search, page, limit, sort, order, filter, ...queryKeys } = req.query;
  console.log('pathParams: ', req.params);
  console.log('queryParams: ', req.query);
  console.log('Fields in getRecords', fields);
  console.log('queryKeys', queryKeys);
  if (Object.keys(req.params).length !== 0 && Object.keys(req.query).length !== 0) throw new RequestValidationError('Bad parameters (path,query string) for request', `To make a request, you can't use together path param (id) and query string params with entity keys values (you can use options parameters as fields, page, limit, sort). ⇒ Use only path param (id) for unique record search by id.  ⇒ Use query string param for unique or multiple search (with one or several fields and one or several values)`);
  if (entities.plural!.secondaryEntity !== null) {
    pathRequest = { [`${entities.singular!.secondaryEntity as string}Id`]: req.params.id };
  } else {
    pathRequest = req.params;
  }
  if (fields) {
    fieldsPrismaObject = {
      select: fieldsToPrismaSelect(fields! as string)
    };
  } else {
    fieldsPrismaObject = {};
  }
  if (Object.keys(queryKeys).length === 0 && Object.keys(req.params).length === 0) {
    queryOrPrismaArray = [];
  } else {
    queryOrPrismaArray = queryPrismaArray(queryKeys, pathRequest);
  }
  if (limit) {
    takePrismaObject.take = Number(limit);
  }
  console.log('queryKeys length: ', Object.keys(queryKeys).length);
  console.log('queryPrismaArray: ', queryOrPrismaArray);
  try {
    // @ts-ignore
    const records = await prisma[entities.singular!.primaryEntity].findMany(
      queryOrPrismaArray.length !== 0 ? {
        ...takePrismaObject,
        where: { OR: queryOrPrismaArray }
        , ...fieldsPrismaObject
      } : { ...fieldsPrismaObject },
    );
    return records;
  } catch (error) {
    console.log(error);
  }
};

export { create, delById, getRecords, updateById };;