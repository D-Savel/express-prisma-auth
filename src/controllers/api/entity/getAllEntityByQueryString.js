"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var sendSuccess_js_1 = require("../../../utils/express/sendSuccess.js");
var users_js_1 = require("../../../datas/users.js");
var fetchUsers_js_1 = require("../../../services/users/fetchUsers.js");
var DatabaseError_js_1 = require("../../../errors/DatabaseError.js");
var client_1 = require("@prisma/client");
var dbRequest_js_1 = require("../../../services/crud/dbRequest.js");
var isNull_js_1 = require("../../../utils/common/isNull.js");
var prisma = new client_1.PrismaClient();
var queryChain = '';
function findUsersBy(queries) {
    queryChain = '';
    var arrayOfQuerries = Object.entries(queries);
    var findUser;
    var filteredUsers = [];
    var _loop_1 = function (query) {
        findUser = [];
        findUser = users_js_1.users.filter(function (user) {
            var userValueForKey = user[query[0]];
            var queryValueForKey = query[1];
            queryChain = "".concat(queryChain, "|").concat(query[0], "=").concat(query[1]);
            return userValueForKey.localeCompare(queryValueForKey) === 0;
        });
        if (findUser.length) {
            //Use Set method to Remove Duplicates
            filteredUsers = __spreadArray([], new Set(__spreadArray(__spreadArray([], filteredUsers, true), findUser, true)), true);
        }
    };
    for (var _i = 0, arrayOfQuerries_1 = arrayOfQuerries; _i < arrayOfQuerries_1.length; _i++) {
        var query = arrayOfQuerries_1[_i];
        _loop_1(query);
    }
    return filteredUsers;
}
var queryData;
var getUsersByQueryString = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var arrayOfQuerries, queries, users_1, usersForQuery, usersResponse, entries, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                arrayOfQuerries = Object.entries(req.query);
                queries = req.query;
                console.log('Array of Queries', arrayOfQuerries);
                queryData = arrayOfQuerries.map(function (_a) {
                    var key = _a[0], val = _a[1];
                    return "".concat(key, "=").concat(val);
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!(arrayOfQuerries.length === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, dbRequest_js_1.getOneByOneParam)(req, 'user')];
            case 2:
                users_1 = [_a.sent()];
                console.log('Users in getByOneParam', users_1);
                if (users_1 && !(0, isNull_js_1.default)(users_1)) {
                    (0, sendSuccess_js_1.sendSuccess)(res, 200, "User info for query ".concat(queryData, " successfully retreived").replace(',', '&'), users_1);
                }
                else {
                    throw new DatabaseError_js_1.DatabaseError("User controller error (getUsersByQuery: No user(s) match(es) with query string: ".concat(queryData));
                }
                _a.label = 3;
            case 3:
                if (!(arrayOfQuerries.length > 1)) return [3 /*break*/, 5];
                usersForQuery = findUsersBy(req.query);
                return [4 /*yield*/, (0, fetchUsers_js_1.default)(usersForQuery)];
            case 4:
                usersResponse = _a.sent();
                if (usersForQuery.length) {
                    entries = Object.entries((req.query));
                    data = entries.map(function (_a) {
                        var key = _a[0], val = _a[1];
                        return "".concat(key, "=").concat(val);
                    });
                    (0, sendSuccess_js_1.sendSuccess)(res, 200, "User info for query ".concat(data, " successfully retreived").replace(',', '&'), { users: usersForQuery });
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, next(error_1)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = getUsersByQueryString;
