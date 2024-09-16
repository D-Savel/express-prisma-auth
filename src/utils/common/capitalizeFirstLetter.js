"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var capitalizeFirstLetter = function (username) {
    return username[0].toUpperCase() + username.slice(1).toLowerCase();
};
exports.default = capitalizeFirstLetter;
