import { Request } from "express";
import { Entity } from "../../types/Entity.js";
import { Entities } from "../../types/Entities.js";
import { randomUUID } from "crypto";
import entitiesFromRequest from "../../utils/common/entitiesFromRequest.js";
import fieldsToPrismaSelect from "../../utils/prisma/fieldsToPrismaSelect.js";
import queryPrismaArray from "../../utils/prisma/queryPrismaArray.js";
import { RequestValidationError } from "../../errors/RequestValidationError.js";
import { CheckExists } from "../../types/CheckExists.js";
import prisma from "../../utils/db/prismaInstance";

// Get primary entity singular name as string from entities object
const primaryEntity = (entities: Entities): string => { return entities.singular!.primaryEntity as string; };

// Create record with method POST
const create = async (req: Request): Promise<Partial<Entity[]> | undefined> => {
  try {
    const entities = entitiesFromRequest(req); // DB entities object in lowercase
    if (entities.singular) {
      const randomId = randomUUID();
      let payload = req.body.payload;
      // Create uuid id if no id in body payload
      if (!req.body.payload.id) { payload.id = randomId; }
      let createdData: Entity[] = [];
      createdData = await (prisma[primaryEntity(entities) as keyof typeof prisma] as any).create({
        data: payload
      });
      return createdData;
    }
  } catch (error) {
    console.log(error);
  }
};

// Update record with method PATCH
const updateById = async (req: Request): Promise<Entity[] | null | undefined> => {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  try {
    const payload = req.body.payload;
    let updatedData: Entity[] = [];
    updatedData = await (prisma[primaryEntity(entities) as keyof typeof prisma] as any).update({
      where: { id: req.params.id }
      ,
      data: payload
    });
    return updatedData;
  } catch (error) {
    console.log(error);
  }
};

// Delete record by id with method DELETE
const delById = async (req: Request): Promise<Entity[] | null | undefined> => {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  try {
    let deletedData: Entity[] = [];
    deletedData = await (prisma[primaryEntity(entities) as keyof typeof prisma] as any).delete({
      where: {
        id: req.params.id,
      },
    });
    return deletedData;
  } catch (error) {
    console.log(error);
  }
};

// Get records with method GET (with or without query string parameters)
const getRecords = async (req: Request, checkExists?: CheckExists): Promise<Entity[] | null | undefined> => {
  console.log('------- RECORD EXISTS Value  ------: ', checkExists);
  let fieldsPrismaObject: object | null; // formated fields(keys) for database 'prisma' request extracted from 'fields' query string
  let queryOrPrismaArray: object[] = []; // formated query for database 'prisma' multi request
  let takePrismaObject: { take: number; } = { take: 10 };  // formated limit value for database 'prisma' request
  let pathRequest: {} = {}; // param path in request
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  // get each query string parameters from request
  const { fields, search, page, limit, sort, order, filter, ...queryKeys } = req.query;
  console.log('PathParams: ', req.params);
  console.log('Query string parameters: ', req.query);
  console.log('Fields in getRecords: ', fields);
  console.log('QueryKeys in query string parameters: ', queryKeys);
  //For request with path param and query string param
  if (Object.keys(req.params).length > 0 && Object.keys(req.query).length > 0 && Object.keys(req.query).includes(Object.keys(req.params).join(''))) throw new RequestValidationError('Bad parameters (path,query string) for request', `To make a request, you can't use together path param (id) and query string params (id) (you can use options parameters as fields, page, limit, sort). ⇒ Use only path param (id) for unique record search by id.  ⇒ Use query string param for unique or multiple search (with one or several fields and one or several values)`);
  //For request with foreign key (ex: user/15644-56454bggf-64b69gdfbrt/stories => foreign key of post = user)
  if (entities.plural!.secondaryEntity !== null) {
    pathRequest = { [`${entities.singular!.secondaryEntity as string}Id`]: req.params.id };
  } else {
    pathRequest = req.params;
  }
  // Define query with all parameters: query string, path and body payload contained in the request(req)
  queryOrPrismaArray = queryPrismaArray(queryKeys, pathRequest, req);

  if (checkExists === 'recordExists') {
    queryOrPrismaArray = queryPrismaArray({}, {}, req);
    // For PATCH or POST request check if recordsExist middleware is used in route
  }
  if (checkExists === 'noRecordForId') {
    // if use noRecordForId middleware, query just use pathRequest
    queryOrPrismaArray = queryPrismaArray({}, pathRequest);
  }
  //For query without parameters(in path, query string or body payload)
  if (Object.keys(queryKeys).length === 0 && Object.keys(req.params).length === 0 && !req.body.payload) {
    queryOrPrismaArray = [];
  }

  //For request with only selected fields to include in response
  if (fields) {
    fieldsPrismaObject = {
      select: fieldsToPrismaSelect(fields! as string)
    };
  } else {
    fieldsPrismaObject = {};
  }

  //For attribute limit number of records in response if limit is fill in query string
  if (limit) {
    takePrismaObject.take = Number(limit);
  }
  console.log('queryKeys length: ', Object.keys(queryKeys).length);
  console.log('queryPrismaArray: ', queryOrPrismaArray);
  try {

    let records: Entity[] = [];
    records = await (prisma[primaryEntity(entities) as keyof typeof prisma] as any).findMany(
      queryOrPrismaArray.length > 0 ? {
        ...takePrismaObject,
        where: { OR: queryOrPrismaArray }
        , ...fieldsPrismaObject
      } :
        {
          ...takePrismaObject,
          ...fieldsPrismaObject
        },
    );
    return records;
  } catch (error) {
    console.log(error);
  }
};

export { create, delById, getRecords, updateById };;