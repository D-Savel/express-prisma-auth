import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/express/sendSuccess.js";
import { create, delById, getRecords, updateById } from "../../services/crud/dbRequest.js";
import entitiesFromRequest from "../../utils/common/entitiesFromRequest.js";
import { User } from "@prisma/client";
import queryPrismaArray from "../../utils/prisma/queryPrismaArray.js";
import bcrypt from "bcryptjs";
import arrayIncludesElements from "../../utils/common/arrayIncludesElements.js";


async function crudForEntity(req: Request, res: Response, next: NextFunction) {
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  console.log('Entities in Crud controller', entities);
  console.log('primary entity: ', entities.singular!.primaryEntity);

  if (req.method === 'POST') {
    try {
      if (entities.singular!.primaryEntity === 'user' && req.body.payload.password) {
        console.log('In CREATE USER *****');
        req.body.payload.password = await bcrypt.hash(req.body.payload.password, 12);
        console.log('PASSWORD ###: ', req.body.payload.password);
        let response = await create(req);
        console.log('Create Response', response);
        const { id, role, password, createdAt, updatedAt, ...cleanedUserResponse } = response as Partial<User>;
        sendSuccess(res, 201, `${entities.singular!.primaryEntity} successfully created`, { [entities.plural!.primaryEntity]: entities.singular!.primaryEntity === 'user' ? [cleanedUserResponse] : [response] });
      } else {
        const createdRecord = await create(req);
        console.log('Create Response', createdRecord);
        sendSuccess(res, 201, `${entities.singular!.primaryEntity} successfully created`, { [entities.plural!.primaryEntity]: [createdRecord] });
      }
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
        sendSuccess(res, 201, `${entities.singular!.primaryEntity} for Id: ${req.params.id} has been successfully updated`, null);
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
      const recordsValuesArray = Array.from(records!).map(item => (Object.values(item))).flat(Infinity);
      if (records!.length > 0) {
        if (queryArray.length === 0) {
          return sendSuccess(res, 200, `${entities.plural!.primaryEntity} succefully received`, { [entities.plural!.primaryEntity]: records });
        }
        if (records!.length === queryArray.length) {
          return sendSuccess(res, 200, `${records!.length} record(s) received / ${queryArray.length > 0 ? queryArray!.length : 1} request(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
        }
        if (arrayIncludesElements(recordsValuesArray as string[], queryValuesArray) && records!.length === 1) {
          return sendSuccess(res, 200, `${records!.length} unique record received / ${queryArray.length > 0 ? queryArray!.length : 1} request(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
        }

        if (records!.length < queryArray.length) {
          return sendSuccess(res, 200, `Partial request match: ${records!.length} record(s) received / ${queryArray.length > 0 ? queryArray!.length : 1} request(s) for ${entities.plural!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
        }
      } else {
        return sendSuccess(res, 200, `no matched record(s) for ${entities.singular!.primaryEntity}`, { [entities.plural!.primaryEntity]: records });
      }
    } catch (error) {
      return next(error);
    }
  }
}


export default crudForEntity;