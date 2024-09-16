"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdValidator = void 0;
var express_validator_1 = require("express-validator");
exports.getUserByIdValidator = [
    (0, express_validator_1.param)("id")
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('user id is required in url path (example: /api/users/45cc8cdc-e36e-4970-af37-fee9088e2fb0')
        .bail()
        .isUUID(4)
        .withMessage('user id is not valid, must be a UUID version 4')
];
