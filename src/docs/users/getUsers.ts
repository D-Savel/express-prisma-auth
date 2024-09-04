import { error404Schema, error422Schema, error500Schema } from "../errors/errorsSchemas";

const getUsers = {
  tags: ['Users'],
  summary: 'Get list of users (Get filtered users with optional query string parameters: username & email)',
  description: 'Get list of users (Get filtered users with optional query string parameters: username &email)',
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
      example: '45cc8cdc-e36e-4970-af37-fee9088e2fb0'
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
            }
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