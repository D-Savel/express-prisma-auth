"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAllEntity_js_1 = require("../../controllers/api/entity/getAllEntity.js");
var isQueryString = function (req, res, next) {
    try {
        if (Object.keys(req.query).length > 0) {
            next();
        }
        else {
            (0, getAllEntity_js_1.default)(req, res, next);
        }
        ;
    }
    catch (error) {
        return next(error);
    }
};
exports.default = isQueryString;
