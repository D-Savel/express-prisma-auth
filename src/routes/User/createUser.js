"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validationMiddleware_js_1 = require("../../middlewares/validation/validationMiddleware.js");
var createUserValidator_js_1 = require("../../validation/users/createUserValidator.js");
var createEntity_js_1 = require("../../controllers/api/entity/createEntity.js");
var approvedBodyMiddleware_js_1 = require("../../middlewares/validation/approvedBodyMiddleware.js");
var entityExists_js_1 = require("../../middlewares/entityExists.js");
var path_1 = require("path");
var url_1 = require("url");
var router = express_1.default.Router();
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var entity = path_1.default.basename(__dirname);
console.log('ENTITY in route', entity);
router.post('/api/users', (0, approvedBodyMiddleware_js_1.default)(['id', 'username', 'email', 'password']), (0, validationMiddleware_js_1.default)(createUserValidator_js_1.createUserValidator), (0, entityExists_js_1.default)(entity), createEntity_js_1.default);
exports.default = router;
