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
exports.DatabaseError = void 0;
var CustomError_js_1 = require("../utils/errors/CustomError.js");
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(ErrorDetail) {
        var _this = _super.call(this, 'Error fetching data to database', ErrorDetail) || this;
        _this.statusCode = 422;
        _this.reason = 'Error fetching data to database';
        Object.setPrototypeOf(_this, DatabaseError.prototype);
        return _this;
    }
    DatabaseError.prototype.formatErrors = function () {
        return [{ message: this.reason }];
    };
    return DatabaseError;
}(CustomError_js_1.CustomError));
exports.DatabaseError = DatabaseError;
