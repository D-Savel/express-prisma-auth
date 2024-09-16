"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterLimiter = exports.loginLimiter = exports.overAllLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
exports.overAllLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100, // limit each IP to 100 requests per windowsMs
});
// use for login page request
exports.loginLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 10, // limit each IP to 10 requests per windowsMs
});
// use for register page request
exports.RegisterLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 10, // limit each IP to 10 requests per windowsMs
});
