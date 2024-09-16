"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
var express_validator_1 = require("express-validator");
var capitalizeFirstLetter_js_1 = require("../../utils/common/capitalizeFirstLetter.js");
exports.createUserValidator = [
    (0, express_validator_1.body)('payload.id')
        .trim()
        .escape()
        .bail()
        .optional({ nullable: true })
        .isUUID(4)
        .withMessage('id is not valid, must be a UUID(version4)'),
    (0, express_validator_1.body)('payload.username')
        .escape()
        .exists()
        .notEmpty()
        .withMessage('username is required')
        .bail()
        .isString()
        .withMessage('username is not valid, must be a string')
        .custom(function (username) {
        console.log('create Validation', (0, capitalizeFirstLetter_js_1.default)(username));
        return (0, capitalizeFirstLetter_js_1.default)(username);
    }),
    (0, express_validator_1.body)('payload.email')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('email address is required')
        .bail()
        .isEmail()
        .withMessage('Please provide valid email')
        .customSanitizer(function (email) {
        return email.toLowerCase();
    }), ,
    (0, express_validator_1.body)('payload.password')
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
