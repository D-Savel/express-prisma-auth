import { Prisma } from "@prisma/client";
import { checkExact, query } from "express-validator";
import getsubdirectoryFromPath from "./getsubdirectoryFromPath.js";
import pluralToSingular from "../../../utils/common/pluralToSingular.js";

const entity = pluralToSingular(getsubdirectoryFromPath());

export const getStoryByValidator = [
  checkExact(
    [query("id")
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('user id is required in query path')
      .bail()
      .isUUID(4)
      .withMessage('user id is not valid, must be a UUID version 4'),
    query("name")
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('username data is required')
      .isString()
      .withMessage('username is not valid, must be a string in query path'),
    query('fields')
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('keys data is required')
      .bail()
      .isString()
      .withMessage('Please provide valid keys for query')
      .custom((field) => {
        // Compare entuty fields in prisma schema with fields value in query string for validating
        const storyPrismaModel = Prisma.dmmf.datamodel.models.find(model => model.dbName === entity);// get entity model in prisma schema;
        const fieldsArray: string[] = field.split(',');
        for (const field of fieldsArray) {
          // verify if field in query string is include in user prisma schema fields;
          if ((storyPrismaModel?.fields.filter(el => el.name === field))!.length == 0) {
            return false;
          }
        }
        return true;
      })
      .withMessage('Please provide valid field(s) for query response'),
    ],
    {
      message: 'invalid field()s in query',
    },
  )
];