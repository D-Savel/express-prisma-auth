import { error404Schema, error400BodySchema, error500Schema } from "../errors/errorsSchemas.js";

const createUser = {
  tags: ['Users'],
  summary: 'Create a new user',
  description: 'Create a new user',
  operationId: 'createUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserBodySchema',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: "User created successfully => return user(new user) properties",
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
                example: 'User Johnny successfully created',
              },
              data: {
                type: 'object',
                example: {
                  users:
                    [
                      {
                        id: 'New random uuid or id = uuid in payload',
                        username: 'Johnny',
                        email: 'johnny@mail.me',
                        password: '!1234Johnny#'
                      },
                    ]
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
      description: 'Bad Request : Bad parameters (Body,path,query string) for request',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponseSchema' },
          examples: {
            Error400BodyExample: {
              $ref: '#/components/examples/Error400BodyExample'
            },
            error400BadBodyExample: {
              $ref: '#/components/examples/Error400BadBodyExample'
            }
          }
        }
      }
    },
    '404': error404Schema,
    '500': error500Schema,
  }
};


export { createUser };