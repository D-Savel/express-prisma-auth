"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BodyRequestValidationError_js_1 = require("../../errors/BodyRequestValidationError.js");
var approvedBodyMiddleware = function (approvedFields) {
    return function (req, res, next) {
        console.log('In approove body middleware', req.body);
        var keys = Object.keys(req.body.payload);
        var invalidFields = keys.filter(function (key) { return !approvedFields.includes(key); });
        if (invalidFields.length === 0) {
            next();
        }
        else {
            throw new BodyRequestValidationError_js_1.default("Invalid field(s): ".concat(invalidFields.join(', ')));
        }
        ;
    };
};
exports.default = approvedBodyMiddleware;
