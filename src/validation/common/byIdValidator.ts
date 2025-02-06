import { Request } from "express";
import { Prisma } from "@prisma/client";
import { param, query } from "express-validator";
import extractEntityFields from "../../utils/db/extractEntityFields";
import entitiesFromRequest from "../../utils/common/entitiesFromRequest.js";

export const byIdValidator = [
  param("payload.id")
    .trim()
    .escape()
    .optional()
    .exists()
    .notEmpty()
    .withMessage('id is required in url path (example: /api/ENTITY/{id}')
    .bail()
    .isUUID(4)
    .withMessage('id is not valid, must be a UUID version 4'),
  query('payload.fields')
    .trim()
    .escape()
    .optional()
    .notEmpty()
    .withMessage('fields data is required')
    .bail()
    .isString()
    .withMessage('Please provide valid keys for query')
    .custom((field, { req }) => {
      const entities = entitiesFromRequest(req as Request);
      // Compare user fields in prisma schema with  field value in query string for validating
      const entityPrismaModel = Prisma.dmmf.datamodel.models.find(entity => entity.dbName === entities.singular!.primaryEntity);// get user model in prisma schema;
      const fieldsArray: string[] = field.split(',');
      console.log('fields array', fieldsArray);
      for (const field of fieldsArray) {
        console.log('filtered field', entityPrismaModel?.fields.filter(el => el.name === field));
        // verify if field in query string is include in user prisma schema fields;
        if ((entityPrismaModel?.fields.filter(el => el.name === field))!.length == 0) {
          return false;
        }
      }
      return true;
    })
    .withMessage('Please provide valid field(s) for query response'),
];