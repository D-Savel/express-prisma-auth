"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUserByIdValidator = void 0;
var express_validator_1 = require("express-validator");
exports.delUserByIdValidator = [
    (0, express_validator_1.param)("id")
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('user id is required in url path = http://serverHost/api/users/{id}')
        .bail()
        .isUUID(4)
        .withMessage('user id is not valid, must be a UUID version 4')
];
