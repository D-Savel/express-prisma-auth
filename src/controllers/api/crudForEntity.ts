import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/express/sendSuccess.js";
import { create, delById, getRecords, updateById } from "../../services/crud/dbRequest.js";
import entitiesFromRequest from "../../utils/common/entitiesFromRequest.js";
import { User } from "@prisma/client";
import queryPrismaArray from "../../utils/prisma/queryPrismaArray.js";


async function crudForEntity(req: Request, res: Response, next: NextFunction) {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  console.log('primary entity: ', entities.singular!.primaryEntity);
  let cleanedUserResponse: Partial<User> | null = null;// use for cleaned response without password,id,created for User

  if (req.method === 'POST') {
    try {
      let response = await create(req);
      if (entities.singular!.primaryEntity === 'user' && response) {
        const { id, password, createdAt, updatedAt, ...cleanedUserResponse } = response as User;
      }
      console.log('Create Response', response);
      if (response) {
        sendSuccess(res, 201, `${entities.singular!.primaryEntity} successfully created`, { [entities.plural!.primaryEntity]: entities.singular!.primaryEntity === 'user' ? [cleanedUserResponse] : [response] });
      }
    } catch (error) {
      return next(error);
    }
  }

  if (req.method === 'DEL') {
    try {
      const deletedRecord = await delById(req);
      console.log('param in del', req.params.id);
      console.log('delete Record response', deletedRecord);
      if (deletedRecord) {
        sendSuccess(res, 200, `${entities.singular!.primaryEntity} with Id: ${req.params.id} has been successfully deleted`, null);
      }
    } catch (error) {
      return next(error);
    }
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    try {
      const updatedRecord = await updateById(req);

      if (updatedRecord) {
        sendSuccess(res, 201, `${entities.singular!.primaryEntity} for Id: ${req.params.id} has been successfully updated`, { [entities.plural!.primaryEntity]: Array.isArray(updatedRecord) ? updatedRecord : [updatedRecord] });
      }
    } catch (error) {
      return next(error);
    }
  };

  if (req.method === 'GET') {
    try {
      const records = await getRecords(req);
      console.log('In crudForEntity', records);
      console.log('Is ARRAY: ', Array.isArray(records));
      if (records) {
        const { fields, search, page, limit, sort, order, filter, ...queryKeys } = req.query;
        let queryArray = queryPrismaArray(queryKeys, req.params);
        // filter empty query param
        queryArray = queryArray.filter(query => Object.keys(query).length !== 0);
        if (records.length === Object.keys(queryArray).length) {
          sendSuccess(res, 200, `Records for ${entities.plural!.primaryEntity} has been successfully retrieved (${records!.length} record(s)/${queryArray!.length} request(s))`, { [entities.plural!.primaryEntity]: records });
        } else {
          sendSuccess(res, 200, `Records for ${entities.plural!.primaryEntity} has been partialy retrieved (${records!.length} record(s)/${queryArray!.length} request(s))`, { [entities.plural!.primaryEntity]: records });
        }
      }
    } catch (error) {
      return next(error);
    }
  }
}


export default crudForEntity;