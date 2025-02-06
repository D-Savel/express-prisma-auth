import { error404Schema, error409Schema, error500Schema } from "../../errors/errorsSchemas";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entity = path.basename(__dirname).split(path.sep).pop();



const loginUser = {
  tags: ['Auth'],
  summary: 'login "local" user',
  description: 'Login user with credentials email/password',
  operationId: 'LoginUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserLoginBodySchema',
        },
      },
    },
  },
  responses: {
    '200': {
      description: "User created successfully => return user(new user) secured properties",
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
                        email: 'johnny@mail.me',
                        username: 'Johnny'
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
    '409': error409Schema(entity as string),
    '500': error500Schema,
  }
};


export { loginUser };