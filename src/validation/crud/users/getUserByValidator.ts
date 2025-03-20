import { Prisma } from "@prisma/client";
import { query, param, checkExact } from "express-validator";
import getsubdirectoryFromPath from "./getsubdirectoryFromPath.js";
import pluralToSingular from "../../../utils/common/pluralToSingular.js";

const entity = pluralToSingular(getsubdirectoryFromPath());

export const getUserByValidator = [
  checkExact(
    [query("id")
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('user id is required in query path')
      .bail()
      .withMessage('id is not valid, must be a UUID version 4')
      .custom((idQuery) => {
        console.log('ID QUERY', idQuery);
        for (const id of (idQuery.split(","))) {
          const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}(?:\/.*)?$/i;
          if (uuidRegex.test(id)) return true;
          else return false;
        }
      })
      .withMessage('id or one of id is not valid, must be a UUID version 4'),
    query("username")
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('username data is required')
      .isString()
      .withMessage('username is not valid, must be a string in query path')
      .customSanitizer((usernameQuery) => {
        let usernames: string = '';
        for (let username of (usernameQuery.split(","))) {
          username = username
            .trim()
            .toLowerCase();
          if (username.length > 0) {
            usernames = `${usernames}${usernames !== '' ? ',' : ''}${username}`;
          }
        }
        return usernames;
      })
      ,
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
        // Compare user fields in prisma schema with  field value in query string for validating
        const userPrismaModel = Prisma.dmmf.datamodel.models.find(model => model.dbName === entity);// get user model in prisma schema;
        const fieldsArray: string[] = field.split(',');
        console.log('fields array', fieldsArray);
        for (const field of fieldsArray) {
          console.log('filtered field', userPrismaModel?.fields.filter(el => el.name === field));
          // verify if field in query string is include in user prisma schema fields;
          if ((userPrismaModel?.fields.filter(el => el.name === field))!.length === 0) {
            return false;
          }
        }
        return true;
      })
      .withMessage(`Invalid field value(s) in query string: please provide valid field(s) for response`),
    query('email')
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('email data is required ')
      .bail()
      .custom((emailQuery) => {
        for (const email of (emailQuery.split(","))) {
          const emailRegex = /^[\w-\._+]+@([\w-]+\.)+[\w-]{2,3}$/;
          if (emailRegex.test(email)) return true;
          else return false;

        }
      }),

    ],
    {
      message: 'invalid field()s in query',
    },
  )
];;;