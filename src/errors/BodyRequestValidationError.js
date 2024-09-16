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
exports.BodyRequestValidationError = void 0;
var CustomError_js_1 = require("../utils/errors/CustomError.js");
var BodyRequestValidationError = /** @class */ (function (_super) {
    __extends(BodyRequestValidationError, _super);
    function BodyRequestValidationError(errorDetail, errors) {
        var _this = _super.call(this, 'Invalid request body parameter(s)', errorDetail) || this;
        _this.errors = errors;
        _this.statusCode = 400;
        _this.reason = 'Bad Request :body fields validation Error';
        Object.setPrototypeOf(_this, BodyRequestValidationError.prototype);
        return _this;
    }
    ;
    BodyRequestValidationError.prototype.formatErrors = function () {
        return this.errors;
    };
    return BodyRequestValidationError;
}(CustomError_js_1.CustomError));
exports.BodyRequestValidationError = BodyRequestValidationError;
exports.default = BodyRequestValidationError;
