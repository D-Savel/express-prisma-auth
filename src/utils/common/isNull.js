"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNull(arr) {
    return arr.every(function (v) { return v === null || v === undefined; });
}
exports.default = isNull;
