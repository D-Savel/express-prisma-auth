"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
var createUser_js_1 = require("./users/createUser.js");
var usersSchemas_js_1 = require("./users/usersSchemas.js");
var examples_js_1 = require("./users/examples.js");
var deleteUserById_js_1 = require("./users/deleteUserById.js");
var getUsers_js_1 = require("./users/getUsers.js");
var getUserById_js_1 = require("./users/getUserById.js");
var updateUserById_js_1 = require("./users/updateUserById.js");
var apiDocumentation = {
    openapi: '3.1.0',
    info: {
        version: '0.1',
        title: 'User REST API - Documentation',
        description: 'user template REST API',
        license: {
            name: 'ISC License',
        },
    },
    servers: [
        {
            url: 'http://localhost:9000/',
            description: 'Local Server',
        }
    ],
    tags: [
        {
            name: 'API',
        }
    ],
    paths: {
        '/api/users': {
            post: createUser_js_1.default,
        },
        '/api/users/{id}': {
            get: getUserById_js_1.getUserById,
            delete: deleteUserById_js_1.deleteUser,
            put: updateUserById_js_1.default
        },
        '/api/users/': {
            get: getUsers_js_1.getUsers,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            UserBodySchema: usersSchemas_js_1.UserBodySchema,
            UserSchema: usersSchemas_js_1.UserSchema,
            UserResponseSchema: usersSchemas_js_1.UserResponseSchema,
            UsersResponseSchema: usersSchemas_js_1.UsersResponseSchema,
            UserUpdateBodySchema: usersSchemas_js_1.UserUpdateBodySchema,
            ErrorResponseSchema: usersSchemas_js_1.ErrorResponseSchema
        },
        examples: {
            usersExample: examples_js_1.usersExample,
            usersQueryExample: examples_js_1.usersQueryExample,
            Error400BodyExample: examples_js_1.Error400BodyExample,
            Error400IdExample: examples_js_1.Error400IdExample,
            Error400BadBodyExample: examples_js_1.Error400BadBodyExample
        }
    }
};
exports.apiDocumentation = apiDocumentation;
