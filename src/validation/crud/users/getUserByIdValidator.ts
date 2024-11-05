import { Prisma } from "@prisma/client";
import { param, query } from "express-validator";

export const getUserByIdValidator = [
  param("id")
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .withMessage('id is required in url path (example: /api/ENTITY/45cc8cdc-e36e-4970-af37-fee9088e2fb0')
    .bail()
    .isUUID(4)
    .withMessage('id is not valid, must be a UUID version 4'),
  query('fields')
    .trim()
    .escape()
    .optional()
    .notEmpty()
    .withMessage('fields data is required')
    .bail()
    .isString()
    .withMessage('Please provide valid keys for query')
    .custom((field) => {
      // Compare user fields in prisma schema with  field value in query string for validating
      const userPrismaModel = Prisma.dmmf.datamodel.models.find(entity => entity.dbName === 'user');// get user model in prisma schema;
      const fieldsArray: string[] = field.split(',');
      console.log('fields array', fieldsArray);
      for (const field of fieldsArray) {
        console.log('filtered field', userPrismaModel?.fields.filter(el => el.name === field));
        // verify if field in query string is include in user prisma schema fields;
        if ((userPrismaModel?.fields.filter(el => el.name === field))!.length == 0) {
          return false;
        }
      }
      return true;
    })
    .withMessage('Please provide valid field(s) for query response'),
];