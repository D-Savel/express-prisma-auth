"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = void 0;
var express_validator_1 = require("express-validator");
var express_validator_2 = require("express-validator");
exports.updateUserValidator = [
    (0, express_validator_2.param)("id")
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('user id is required in url path = http://serverHost/api/users/user/{id}')
        .bail()
        .isUUID(4)
        .withMessage('user id is not valid, must be a UUID version 4'),
    (0, express_validator_1.body)('username')
        .trim()
        .escape()
        .optional()
        .notEmpty()
        .withMessage('username data is required to update value')
        .isString()
        .withMessage('username is not valid, must be a string')
        .customSanitizer(function (userName) {
        return userName.replace(/^\w/, function (c) { return c.toUpperCase(); });
    }),
    (0, express_validator_1.body)('email')
        .trim()
        .escape()
        .optional()
        .notEmpty()
        .withMessage('email data is required to update value')
        .bail()
        .isEmail()
        .withMessage('Please provide valid email'),
    (0, express_validator_1.body)('password')
        .trim()
        .escape()
        .optional()
        .notEmpty()
        .withMessage('password data is required to update value')
        .bail()
        .isString()
        .isLength({ min: 4, max: 20 })
        .withMessage('password must be between 4 and 20 characters'),
];
