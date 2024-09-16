"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
var errorsSchemas_js_1 = require("../errors/errorsSchemas.js");
var parameters = {
    dbEntity: 'user', //searched entity in db
    keyName: 'id', // key for query string in path
    keyValue: "6127b1a7-edf4-491f-af40-ea5b9495d3d8", // value for query string in path
};
var deleteUser = {
    tags: ['Users'],
    summary: 'Delete a user on a single ID',
    description: 'Delete a user  on a single ID',
    operationId: 'delUserById',
    security: [
        {
            bearerAuth: [],
        },
    ],
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "description": "User id",
            "type": "string",
            "default": parameters.keyValue,
        }
    ],
    responses: {
        '200': {
            description: 'User deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'success',
                            },
                            message: {
                                type: 'string',
                                example: "User with Id: ".concat(parameters.keyValue, " has been successfully deleted"),
                            },
                            data: {
                                type: null,
                                example: null,
                            },
                            errors: {
                                type: null,
                                example: null
                            }
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Bad Request: Bad path parameters for request (ex: id value = 12345)',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/ErrorResponseSchema' },
                    example: {
                        status: 'error',
                        message: 'Bad Request : Bad body or path parameters for request',
                        data: {
                            errors: [
                                {
                                    type: 'field',
                                    value: '12345',
                                    msg: 'user id is not valid, must be a UUID version 4',
                                    path: 'id',
                                    location: 'params'
                                },
                            ]
                        }
                    }
                }
            }
        },
        '404': errorsSchemas_js_1.error404Schema,
        '422': (0, errorsSchemas_js_1.error422Schema)(parameters.keyName, parameters.dbEntity, '6127b1a7-edf4-491f-af40-ea5b9495d3d9'),
        '500': errorsSchemas_js_1.error500Schema,
    }
};
exports.deleteUser = deleteUser;
