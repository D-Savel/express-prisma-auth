import { error404Schema, error422Schema, error500Schema } from "../errors/errorsSchemas.js";

const getUsers = {
  tags: ['Users'],
  summary: 'Get list of users (Get specific users and specific fields in response with optional query string parameters)',
  description: 'Get list of users without optional query string parameters \n\nGet several specific users with optional query string parameters => ex: username=...&email=... &id=...\n\nReceive only selected fields of an entity in response from a request with fields query string parameters  => ex: fields= id,username,email',
  operationId: 'getUsers or getUsersBy',
  security: [
    {
      bearerAuth: [],
    },
  ],
  "parameters": [
    {
      name: "id",
      in: "query",
      description: "User id (uuid)",
      type: "string",
      example: '6127b1a7-edf4-491f-af40-ea5b9495d3d8'
    },
    {
      name: "username",
      in: "query",
      description: "The first name of the user (letter case ignored)",
      type: "string",
      example: 'john'
    },
    {
      name: "email",
      in: "query",
      description: "email of the user",
      type: "string",
      example: 'emmaDoe@me.fr'
    },
    {
      name: "fields",
      in: "query",
      description: "selected fields of an entity to receive in response",
      type: "string",
      example: 'id,email'
    },
  ],
  responses: {
    '200': {
      description: 'Users retrieved successfully!',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/UsersResponseSchema' },
          examples: {
            usersExample: {
              $ref: '#/components/examples/usersExample'
            },
            usersQueryExample: {
              $ref: '#/components/examples/usersQueryExample'
            },
            usersFieldsQueryExample: {
              $ref: '#/components/examples/usersFieldsQueryExample'
            },
            noMatchResponse: {
              $ref: '#/components/examples/noMatchResponse'
            },
          }
        }
      }
    },
    '404': error404Schema,
    '422': error422Schema('query string', 'user'),
    '500': error500Schema,
  }
};




export { getUsers };