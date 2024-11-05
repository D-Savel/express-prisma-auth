import { UserBodySchema, UserSchema, UserResponseSchema, UsersResponseSchema, UserUpdateBodySchema, ErrorResponseSchema } from './users/usersSchemas.js';
import { usersExample, usersQueryExample, usersFieldsQueryExample, Error400BodyExample, Error400IdExample, Error400BadBodyExample } from './users/examples.js';
import { createUser } from './users/createUser.js';
import { deleteUser } from './users/deleteUserById.js';
import { getUsers } from './users/getUsers.js';
import { getUserById } from './users/getUserById.js';
import { updateUser } from './users/updateUserById.js';



const apiDocumentation = {
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
      post: createUser,
    },
    '/api/users/{id}': {
      get: getUserById,
      delete: deleteUser,
      patch: updateUser
    },
    '/api/users/': {
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

      UserBodySchema,
      UserSchema,
      UserResponseSchema,
      UsersResponseSchema,
      UserUpdateBodySchema,
      ErrorResponseSchema
    },
    examples: {
      usersExample,
      usersQueryExample,
      usersFieldsQueryExample,
      Error400BodyExample,
      Error400IdExample,
      Error400BadBodyExample
    }
  }
};

export { apiDocumentation };