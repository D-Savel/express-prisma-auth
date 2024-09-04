import { query, checkExact } from "express-validator";

export const getUserByValidator = [
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
    query("username")
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('username data is required')
      .isString()
      .withMessage('username is not valid, must be a string in query path')
      .customSanitizer((userName) => {
        return userName.replace(/^\w/, (c: string) => c.toUpperCase());
      }),
    query('email')
      .trim()
      .escape()
      .optional()
      .notEmpty()
      .withMessage('email data is required to update value')
      .bail()
      .isEmail()
      .withMessage('Please provide valid email'),
    ],
    {
      message: 'invalid field()s in query',
    }
  )
];