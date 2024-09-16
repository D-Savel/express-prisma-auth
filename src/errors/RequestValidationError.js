"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
var CustomError_js_1 = require("../utils/errors/CustomError.js");
var RequestValidationError = /** @class */ (function (_super) {
    __extends(RequestValidationError, _super);
    function RequestValidationError(errorDetail, errors) {
        var _this = _super.call(this, 'Request parameters validation', errorDetail) || this;
        _this.errors = errors;
        _this.statusCode = 400;
        _this.reason = 'Bad Request :parameters validation Error';
        Object.setPrototypeOf(_this, RequestValidationError.prototype);
        return _this;
    }
    ;
    RequestValidationError.prototype.formatErrors = function () {
        return this.errors;
    };
    return RequestValidationError;
}(CustomError_js_1.CustomError));
exports.RequestValidationError = RequestValidationError;
