"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorsSchemas_js_1 = require("../errors/errorsSchemas.js");
var parameters = {
    dbEntity: 'user', //searched entity in db
    keyName: 'id', // key for query string in path
    keyValue: "45cc8cdc-e36e-4970-af37-fee9088e2fb0", // value for query string in path
};
var updateUser = {
    tags: ['Users'],
    summary: 'Update a user',
    description: 'Update a user',
    operationId: 'UpdateUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            "name": parameters.keyName,
            "in": "path",
            "description": "User id",
            "type": "string",
            "default": parameters.keyValue,
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UserUpdateBodySchema',
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: "User update successfully => return user(updated user) properties",
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
                                example: 'User for Id: 45cc8cdc-e36e-4970-af37-fee9088e2fb0 has been successfully updated',
                            },
                            data: {
                                type: 'object',
                                example: {
                                    user: {
                                        id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0',
                                        username: 'Sahra',
                                        email: 'sahra@email.com',
                                        password: '!1234Sahra'
                                    }
                                }
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
            description: 'Bad Request : Bad body or path parameters for request',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/ErrorResponseSchema' },
                    examples: {
                        Error400BodyExample: {
                            $ref: '#/components/examples/Error400BodyExample'
                        },
                        error400IdExample: {
                            $ref: '#/components/examples/Error400IdExample'
                        },
                        error400BadBodyExample: {
                            $ref: '#/components/examples/Error400BadBodyExample'
                        }
                    }
                }
            }
        },
        '422': (0, errorsSchemas_js_1.error422Schema)(parameters.keyName, parameters.dbEntity, parameters.keyValue.slice(1, -1)),
        '404': errorsSchemas_js_1.error404Schema,
        '500': errorsSchemas_js_1.error500Schema,
    }
};
exports.default = updateUser;
