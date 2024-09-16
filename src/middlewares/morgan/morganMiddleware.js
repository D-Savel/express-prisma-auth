"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = require("morgan");
var winston_js_1 = require("../../config/winston/winston.js");
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
var stream = {
    // Use the http severity
    write: function (message) { return winston_js_1.default.http(message); },
};
morgan_1.default.token('client-ip', function (req) {
    return "IP: ".concat(req.socket.remoteAddress, ":").concat(req.socket.remotePort, " /") || '-';
});
morgan_1.default.token('client-url', function (req) {
    return "URL: - ".concat(req.url);
});
// Build the morgan middleware
var morganMiddleware = (0, morgan_1.default)(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
":client-ip :client-url :method :status :res[content-length] - :response-time ms", { stream: stream });
exports.default = morganMiddleware;
