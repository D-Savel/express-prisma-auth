import { body } from "express-validator";
import capitalizeFirstLetter from "../../../utils/common/capitalizeFirstLetter.js";

export const createUserValidator =
  [
    body('payload.id')
      .trim()
      .escape()
      .bail()
      .optional({ nullable: true })
      .isUUID(4)
      .withMessage('id is not valid, must be a UUID(version4)')
    ,
    body('payload.username')
      .escape()
      .exists()
      .notEmpty()
      .withMessage('username is required')
      .bail()
      .isString()
      .withMessage('username is not valid, must be a string')
      .customSanitizer((username: string) => {
        console.log('create Validation', username);
        return username.toLowerCase();
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
      .customSanitizer((email: string) => {
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
      .isLength({ min: 4, max: 40 })
      .withMessage('password must be between 4 and 40 characters'),
  ];