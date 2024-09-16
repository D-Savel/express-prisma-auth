"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.updateById = exports.getOneByOneParam = exports.delById = exports.create = void 0;
var client_1 = require("@prisma/client");
var capitalizeFirstLetter_js_1 = require("../../utils/common/capitalizeFirstLetter.js");
var crypto_1 = require("crypto");
var prisma = new client_1.PrismaClient();
var create = function (req, entity) { return __awaiter(void 0, void 0, void 0, function () {
    var randomId, payload, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                randomId = (0, crypto_1.randomUUID)();
                payload = req.body.payload;
                payload = __assign(__assign({}, payload), { username: (0, capitalizeFirstLetter_js_1.default)(payload.username), id: !payload.id ? randomId : payload.id });
                return [4 /*yield*/, prisma[entity].create({
                        data: payload
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var updateById = function (req, entity) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payload = req.body.payload;
                payload = __assign(__assign({}, payload), { username: (0, capitalizeFirstLetter_js_1.default)(payload.username) });
                return [4 /*yield*/, prisma[entity].update({
                        where: { id: req.params.id },
                        data: payload
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateById = updateById;
var delById = function (req, entity) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma[entity].delete({
                        where: {
                            id: req.params.id,
                        },
                    })];
            case 1:
                deletedData = _a.sent();
                return [2 /*return*/, deletedData];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delById = delById;
var getAll = function (req, entity) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, entity];
    });
}); };
var getOneByOneParam = function (req, entity) { return __awaiter(void 0, void 0, void 0, function () {
    var uniqueAtributs, param, obj, data, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                uniqueAtributs = [{ User: 'email' }];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                param = req.params;
                console.log('Param', param);
                // if no id in path get param in query
                if (Object.keys(param).length === 0) {
                    param = req.query;
                }
                // if method POST (create) param is set to unique attribut value in payload for checking duplicate
                console.log('Method', req.method);
                if (req.method === 'POST' || req.method === 'PUT') {
                    console.log('in req method', entity);
                    obj = uniqueAtributs.find(function (el) { return Object.keys(el).toString() === entity; });
                    console.log('in req method OBJ', obj);
                    if (obj) {
                        console.log('Object', obj);
                        console.log('Param key', obj[entity]);
                        param = (_a = {}, _a[obj[entity]] = req.body.payload[obj[entity]], _a);
                        console.log('param in POST PUT req', param);
                    }
                }
                // Throw error for bad param (No param or more than one param)
                if (Object.keys(param).length > 1) {
                    throw new Error('More than one param for request function => getByoneParam');
                }
                if (Object.keys(param).length === 0) {
                    throw new Error('no param for request function => getOneByOneParam');
                }
                console.log('Param', param);
                return [4 /*yield*/, prisma[entity].findFirst({
                        where: param
                    })];
            case 2:
                data = _b.sent();
                return [2 /*return*/, data];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOneByOneParam = getOneByOneParam;
var getById = function (req, entity) { return __awaiter(void 0, void 0, void 0, function () {
    var param, data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                param = req.params;
                console.log('Param', param);
                return [4 /*yield*/, prisma[entity].findFirst({
                        where: param
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getById = getById;
