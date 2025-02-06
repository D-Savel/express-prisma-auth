import { error404Schema, error500Schema } from "../errors/errorsSchemas.js";

const parameters = {
  dbEntity: 'user', //searched entity in db
  keyName: 'id', // key for query string in path
  keyValue: "6127b1a7-edf4-491f-af40-ea5b9495d3d8",// value for query string in path
};

const getUserById = {
  tags: ['Users'],
  summary: 'Get a user on a single ID',
  description: 'Get a user  on a single ID',
  operationId: 'getUserById',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      "name": parameters.keyName,
      "in": "path",
      "description": "User id (uuid)",
      "type": "string",
      "default": parameters.keyValue,
    }
  ],
  responses: {
    '200': {
      description: 'User retrieved successfully or no matched record(s) for user',
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
              },
              data: {
                type: 'object',
              },
              errors: {
                type: null,
              }
            },
          },
          examples: {
            userExample: {
              $ref: '#/components/examples/userExample'
            },
            userNoMatch: {
              $ref: '#/components/examples/noMatchResponse'
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
            message: 'Bad Request : Bad path parameters for request',
            data: null,
            errors:
              [
                {
                  type: 'field',
                  value: '12345',
                  msg: 'user id is not valid, must be a UUID version 4',
                  path: 'id',
                  location: 'params'
                },
              ],
          }
        }
      }
    }
  },
  '404': error404Schema,
  '500': error500Schema,
};


export { getUserById };