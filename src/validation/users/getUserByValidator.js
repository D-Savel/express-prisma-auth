"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByValidator = void 0;
var express_validator_1 = require("express-validator");
exports.getUserByValidator = [
    (0, express_validator_1.checkExact)([(0, express_validator_1.query)("id")
            .trim()
            .escape()
            .optional()
            .notEmpty()
            .withMessage('user id is required in query path')
            .bail()
            .isUUID(4)
            .withMessage('user id is not valid, must be a UUID version 4'),
        (0, express_validator_1.query)("username")
            .trim()
            .escape()
            .optional()
            .notEmpty()
            .withMessage('username data is required')
            .isString()
            .withMessage('username is not valid, must be a string in query path')
            .customSanitizer(function (userName) {
            return userName.replace(/^\w/, function (c) { return c.toUpperCase(); });
        }),
        (0, express_validator_1.query)('email')
            .trim()
            .escape()
            .optional()
            .notEmpty()
            .withMessage('email data is required to update value')
            .bail()
            .isEmail()
            .withMessage('Please provide valid email'),], {
        message: 'invalid field()s in query',
    })
];
