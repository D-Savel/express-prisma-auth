"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getAllEntityByQueryString_js_1 = require("../../controllers/api/entity/getAllEntityByQueryString.js");
var validationMiddleware_js_1 = require("../../middlewares/validation/validationMiddleware.js");
var getUserByValidator_js_1 = require("../../validation/users/getUserByValidator.js");
var isQueryString_js_1 = require("../../middlewares/users/isQueryString.js");
var router = express_1.default.Router();
//Apply isQueryString middleware to redirect query string request
router.get('/api/users', isQueryString_js_1.default, (0, validationMiddleware_js_1.default)(getUserByValidator_js_1.getUserByValidator), getAllEntityByQueryString_js_1.default);
exports.default = router;
