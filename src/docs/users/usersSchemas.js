"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseSchema = exports.UserUpdateBodySchema = exports.UsersResponseSchema = exports.UserSchema = exports.UserResponseSchema = exports.UserBodySchema = void 0;
var UserBodySchema = {
    type: 'object',
    properties: {
        payload: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'Johnny',
                },
                email: {
                    type: 'string',
                    example: 'johnny@email.com',
                },
                password: {
                    type: 'string',
                    description: "unencrypted user's password",
                    example: '!1234Johnny#',
                }
            }
        }
    }
};
exports.UserBodySchema = UserBodySchema;
var UserUpdateBodySchema = {
    type: 'object',
    properties: {
        payload: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'Sahra',
                },
                email: {
                    type: 'string',
                    example: 'sahra@email.com',
                },
                password: {
                    type: 'string',
                    description: "unencrypted user's password",
                    example: '!1234Sahra',
                }
            }
        }
    }
};
exports.UserUpdateBodySchema = UserUpdateBodySchema;
var UserSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            example: 'new random created uuid',
        },
        username: {
            type: 'string',
            example: 'Johnny',
        },
        email: {
            type: 'string',
            example: 'johnny@email.com',
        },
        password: {
            type: 'string',
            description: "unencrypted user's password",
            example: '!1234Johnny#',
        }
    }
};
exports.UserSchema = UserSchema;
var UserResponseSchema = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
        },
        message: {
            type: 'string',
        },
        data: {
            type: 'object',
            properties: {
                "users": {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: 'new random created uuid',
                        },
                        username: {
                            type: 'string',
                            example: 'Johnny',
                        },
                        email: {
                            type: 'string',
                            example: 'johnny@email.com',
                        },
                        password: {
                            type: 'string',
                            description: "unencrypted user's password",
                            example: '!1234Johnny#',
                        }
                    },
                }
            }
        },
        errors: {
            type: 'null',
            example: null
        }
    }
};
exports.UserResponseSchema = UserResponseSchema;
var UsersResponseSchema = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
        },
        message: {
            type: 'string',
        },
        data: {
            type: 'object',
            properties: {
                "users": {
                    type: 'array',
                    items: {
                        type: 'object',
                        $ref: '#/components/schemas/UserSchema'
                    }
                }
            }
        },
        errors: {
            type: 'null',
            example: null
        }
    }
};
exports.UsersResponseSchema = UsersResponseSchema;
var ErrorResponseSchema = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
        },
        message: {
            type: 'string',
        },
        data: {
            type: null,
        },
        errors: {
            type: 'array',
        }
    }
};
exports.ErrorResponseSchema = ErrorResponseSchema;
