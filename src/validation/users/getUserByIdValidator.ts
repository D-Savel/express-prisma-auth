import { param } from "express-validator";

export const getUserByIdValidator = [
  param("id")
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .withMessage('user id is required in url path (example: /api/users/45cc8cdc-e36e-4970-af37-fee9088e2fb0')
    .bail()
    .isUUID(4)
    .withMessage('user id is not valid, must be a UUID version 4')
];