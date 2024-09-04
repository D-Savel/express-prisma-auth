import { body } from "express-validator";
import { users } from "../../datas/users";
import { DuplicateUserError } from "../../errors/DuplicateUserError";

export const createUserValidator =
  [
    body('payload.username')
      .escape()
      .exists()
      .notEmpty()
      .withMessage('username is required')
      .bail()
      .isString()
      .withMessage('username is not valid, must be a string')
      .customSanitizer((username: string) => {
        return username.replace(/^\w/, (c: string) => c.toUpperCase());
      }),
    body('payload.email')
      .trim()
      .escape()
      .exists()
      .notEmpty()
      .withMessage('email address is required')
      .bail()
      .isEmail()
      .withMessage('Please provide valid email')
      .customSanitizer((email) => {
        return email.toLowerCase();
      }), ,
    body('payload.password')
      .trim()
      .escape()
      .exists()
      .notEmpty()
      .withMessage('password is required')
      .bail()
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ];