import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/express/sendSuccess.js";
import { create, delById, getRecords, updateById } from "../../services/crud/dbRequest.js";
import entitiesFromRequest from "../../utils/common/entitiesFromRequest.js";
import { User } from "@prisma/client";
import queryPrismaArray from "../../utils/prisma/queryPrismaArray.js";
import { Entity } from "../../types/Entity.js";

import arrayIncludesElements from "../../utils/common/arrayIncludesElements.js";


async function crudForEntity(req: Request, res: Response, next: NextFunction) {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  console.log('primary entity: ', entities.singular!.primaryEntity);
  let cleanedUserResponse: Partial<User> | Object = {};// use for cleaned response without password,id,created for User

  if (req.method === 'POST') {
    try {
      let response = await create(req);
      console.log('Create Response', response);
      if (response) {
        console.log('In CREATE USER *****');
        const { id, password, createdAt, updatedAt, ...cleanedUserResponse } = response as Partial<User>;
        sendSuccess(res, 201, `${entities.singular!.primaryEntity} successfully created`, { [entities.plural!.primaryEntity]: entities.singular!.primaryEntity === 'user' ? [cleanedUserResponse] : [response] });
      }
      // console.log('Create Response', response);
      // if (response) {
      //   sendSuccess(res, 201, `${entities.singular!.primaryEntity} successfully created`, { [entities.plural!.primaryEntity]: entities.singular!.primaryEntity === 'user' ? [cleanedUserResponse] : [response] });
      // }
    } catch (error) {
      return next(error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      console.log('in DEL Method ****');
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
      const { fields, search, page, limit, sort, order, filter, ...queryKeys } = req.query;
      let queryArray = queryPrismaArray(queryKeys, req.params);
      // filter empty query param
      queryArray = queryArray.filter(query => Object.values(query).length !== 0);
      const queryValuesArray = queryArray.map(item => Object.values(item).toString());
      const recordsValuesArray = Array.from(records as unknown as []).map(item => (Object.values(item))).flat(Infinity);
      if (records!.length > 0) {
        console.log('query values', queryValuesArray);
        console.log('records values', recordsValuesArray);

        if (records!.length === queryArray.length) {
          return sendSuccess(res, 200, `${records!.length} record(s) received / ${queryArray!.length} request(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
        }
        if (arrayIncludesElements(recordsValuesArray as string[], queryValuesArray) && records!.length === 1) {
          return sendSuccess(res, 200, `${records!.length} unique record received / ${queryArray!.length} request(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
        }

        if (records!.length < queryArray.length) {
          return sendSuccess(res, 200, `Partial request match: ${records!.length} record(s) received / ${queryArray!.length} request(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
        }
      } else {
        return sendSuccess(res, 200, `no matched record(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
      }
    } catch (error) {
      return next(error);
    }
  }
}


export default crudForEntity;