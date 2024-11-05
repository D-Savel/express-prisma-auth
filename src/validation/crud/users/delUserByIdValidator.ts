import { param } from "express-validator";

export const delUserByIdValidator = [
  param("id")
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .withMessage('user id is required in url path = http://serverHost/api/users/{id}')
    .bail()
    .isUUID(4)
    .withMessage('user id is not valid, must be a UUID version 4')
];