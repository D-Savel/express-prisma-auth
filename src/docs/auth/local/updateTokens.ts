import { error404Schema, error409Schema, error500Schema } from "../../errors/errorsSchemas";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entity = path.basename(__dirname).split(path.sep).pop();



const updateTokens = {
  tags: ['Auth'],
  summary: 'Update Tokens when access token is expired',
  description: 'Update Tokens: Access token and refresh token when access token is expired',
  operationId: 'updateTokens',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: "new tokens created successfully",
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
                example: 'new Tokens created',
              },
              data: {
                type: null,
                example: null
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
    '401': error404Schema,
    '403': error404Schema,
    '500': error500Schema,
  }
};


export { updateTokens };