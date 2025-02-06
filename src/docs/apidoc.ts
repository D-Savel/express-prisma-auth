import { UserCreateBodySchema, UserSchema, UserResponseSchema, UsersResponseSchema, UserUpdateBodySchema, ErrorResponseSchema } from './users/entitySchemas.js';
import { recordsResponseExample, recordResponseExample, recordsFieldsQueryExample, Error400BodyExample, Error400IdExample, Error400BadBodyExample, noMatchResponse } from './users/examples.js';
import { createUser } from './auth/createUser.js';
import { createUserInUser } from './users/createUserInUser.js';
import { deleteRecordByIdForEntity } from './users/crudEntityDoc.js';
import { getUsers } from './users/getUsers.js';
import { getRecordByIdForEntity } from './users/crudEntityDoc.js';
import { updateRecordForEntity } from './users/crudEntityDoc.js';
import { UserLoginBodySchema } from './auth/authSchemas.js';
import { loginUser } from './auth/local/login.js';
import { updateTokens } from './auth/local/updateTokens.js';



const apiDocumentation = {
  openapi: '3.1.0',
  info: {
    version: '0.1',
    title: 'REST API - Documentation',
    description: 'SAAS REST API',
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
    '/api/v1/auth/local/register/users': {
      post: createUser,
    },
    '/api/v1/auth/local/login': {
      post: loginUser,
    },
    '/api/v1/auth/local/refreshToken': {
      get: updateTokens,
    },
    '/api/v1/users': {
      post: createUserInUser,
    },
    '/api/v1/users/{id}': {
      get: getRecordByIdForEntity,
      delete: deleteRecordByIdForEntity,
      patch: updateRecordForEntity
    },
    '/api/v1/users/': {
      get: getUsers,
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

      UserCreateBodySchema,
      UserSchema,
      UserResponseSchema,
      UsersResponseSchema,
      UserUpdateBodySchema,
      ErrorResponseSchema,
      UserLoginBodySchema
    },
    examples: {
      recordsResponseExample,
      recordResponseExample,
      noMatchResponse,
      recordsFieldsQueryExample,
      Error400BodyExample,
      Error400IdExample,
      Error400BadBodyExample,
    }
  }
};

export { apiDocumentation };