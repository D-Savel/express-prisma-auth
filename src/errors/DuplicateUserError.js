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
exports.DuplicateUserError = void 0;
var CustomError_js_1 = require("../utils/errors/CustomError.js");
var DuplicateUserError = /** @class */ (function (_super) {
    __extends(DuplicateUserError, _super);
    function DuplicateUserError(ErrorDetail) {
        var _this = _super.call(this, 'Duplicate User', ErrorDetail) || this;
        _this.statusCode = 400;
        _this.reason = 'Error fetching data to database';
        Object.setPrototypeOf(_this, DuplicateUserError.prototype);
        return _this;
    }
    DuplicateUserError.prototype.formatErrors = function () {
        return [{ message: this.reason }];
    };
    return DuplicateUserError;
}(CustomError_js_1.CustomError));
exports.DuplicateUserError = DuplicateUserError;
