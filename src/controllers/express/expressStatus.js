"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var sendSuccess_js_1 = require("../../utils/express/sendSuccess.js");
dotenv.config();
var PORT = process.env.PORT || 9000;
var expressStatusController = function (req, res) {
    (0, sendSuccess_js_1.sendSuccess)(res, 200, "Node server is alive", { status: "\uD83D\uDE13  \uD83D\uDE3A  Hello World ! - Express server is running on ".concat(PORT, " - great!!  \uD83D\uDE3A  \uD83D\uDE13") });
};
exports.default = expressStatusController;
