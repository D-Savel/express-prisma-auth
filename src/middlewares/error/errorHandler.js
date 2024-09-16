"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError_js_1 = require("../../utils/errors/CustomError.js");
var winston_js_1 = require("../../config/winston/winston.js");
var sendError_js_1 = require("../../utils/express/sendError.js");
var RequestValidationError_js_1 = require("../../errors/RequestValidationError.js");
var errorHandler = function (error, req, res, next) {
    if (error && error instanceof CustomError_js_1.CustomError) {
        winston_js_1.default.error(error instanceof RequestValidationError_js_1.RequestValidationError ? "".concat(error.errorDetail, "\n").concat(JSON.stringify(error.formatErrors())) : "".concat(error, " => ").concat(error.errorDetail));
        return (0, sendError_js_1.sendError)(res, error.statusCode, error instanceof RequestValidationError_js_1.RequestValidationError ? 'Bad Request : Bad body or path parameters for request' : error.message, error instanceof RequestValidationError_js_1.RequestValidationError ? error.formatErrors() : error.errorDetail || 'none');
    }
    if (error && error instanceof Error) {
        winston_js_1.default.error("Node server error \n ".concat(error.stack));
        return (0, sendError_js_1.sendError)(res, 500, "Node server error", "  Node error \n ".concat(error.stack));
    }
};
exports.default = errorHandler;
