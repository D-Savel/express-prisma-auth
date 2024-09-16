"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import single route from directory
// ex: import ...Router from "./...Router";
var getUsers_js_1 = require("./User/getUsers.js");
var createUser_js_1 = require("./User/createUser.js");
var updateUserById_js_1 = require("./User/updateUserById.js");
var getUserById_js_1 = require("./User/getUserById.js");
var expressRoot_js_1 = require("./root/expressRoot.js");
var delUserById_js_1 = require("./User/delUserById.js");
var router = express_1.default.Router();
router.use('', expressRoot_js_1.default);
router.use('', getUsers_js_1.default);
router.use('', createUser_js_1.default);
router.use('', updateUserById_js_1.default);
router.use('', getUserById_js_1.default);
router.use('', delUserById_js_1.default);
exports.default = router;
