import { body } from 'express-validator';
import { param } from "express-validator";


export const updateUserValidator = [
  param("id")
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .withMessage('user id is required in url path = http://serverHost/api/v1/users/{id}')
    .bail()
    .isUUID(4)
    .withMessage('user id is not valid, must be a UUID version 4'),
  body('payload.username')
    .trim()
    .escape()
    .optional()
    .notEmpty()
    .withMessage('username data is required to update value')
    .isString()
    .withMessage('username is not valid, must be a string')
    .customSanitizer((userName) => {
      return userName.replace(/^\w/, (c: string) => c.toUpperCase());
    }),
  body('payload.email')
    .trim()
    .escape()
    .optional()
    .notEmpty()
    .withMessage('email data is required to update value')
    .bail()
    .isEmail()
    .withMessage('Please provide valid email')
  ,
  body('payload.password')
    .trim()
    .escape()
    .optional()
    .notEmpty()
    .withMessage('password data is required to update value')
    .bail()
    .isString()
    .isLength({ min: 4, max: 20 })
    .withMessage('password must be between 4 and 20 characters'),
]



