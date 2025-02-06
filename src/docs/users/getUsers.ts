import { error404Schema, error500Schema } from "../errors/errorsSchemas.js";

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
      description: "User id (uuid). Can be a single id (ex: 6127b1a7-edf4-491f-af40-ea5b9495d3d8) id or multi id (for admin only) ex: 6127b1a7-edf4-491f-af40-ea5b9495d3d8, 6127b1a7-edf4-491f-af40-ea5b9495d3d0, ...",
      type: "string",
      example: '6127b1a7-edf4-491f-af40-ea5b9495d3d8'
    },
    {
      name: "username",
      in: "query",
      description: "username uses for user (query string for admin only) : Can be a single username John or multi username ex: username John,Emma,...",
      type: "string",
      example: 'John'
    },
    {
      name: "email",
      in: "query",
      description: "email of the user (query string for admin only)",
      type: "string",
      example: 'emmaDoe@me.fr or emma@mail.me,johnny@mail.me,...  '
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
      description: 'Users retrieved successfully or no matched record(s) for user',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/UsersResponseSchema' },
          examples: {
            usersExample: {
              $ref: '#/components/examples/recordsResponseExample'
            },
            usersQueryExample: {
              $ref: '#/components/examples/usersQueryExample'
            },
            usersFieldsQueryExample: {
              $ref: '#/components/examples/recordsFieldsQueryExample'
            },
            noMatchResponse: {
              $ref: '#/components/examples/noMatchResponse'
            },
          }
        }
      }
    },
    '404': error404Schema,
    '500': error500Schema,
  }
};




export { getUsers };