import path from "node:path";
import { fileURLToPath } from "node:url";
import { error404Schema, error500Schema } from "../errors/errorsSchemas.js";
import capitalizeFirstLetter from "../../utils/common/capitalizeFirstLetter.js";
import pluralToSingular from "../../utils/common/pluralToSingular.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entity = path.basename(__dirname).split(path.sep).pop();



const parameters = {
  dbEntity: entity, //searched entity in db
  keyName: 'id',  // key for query string in path
  keyValue: "6127b1a7-edf4-491f-af40-ea5b9495d3d8", // value for query string in path
};

const deleteEntity = {
  tags: [capitalizeFirstLetter(entity!)],
  summary: `Delete a ${entity} on a single ID`,
  description: `Delete a ${entity}  on a single ID`,
  operationId: `del${capitalizeFirstLetter(pluralToSingular(entity!))}ById`,
  security: [
    {
      bearerAuth: [],
    },
  ],
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "description": "User id",
      "type": "string",
      "default": parameters.keyValue,
    }
  ],
  responses: {
    '200': {
      description: 'User deleted successfully!',
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
                example: `User with Id: ${parameters.keyValue} has been successfully deleted`,
              },
              data: {
                type: null,
                example: null,
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
      description: 'Bad Request: Bad path parameters for request (ex: id value = 12345)',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponseSchema' },
          example: {
            status: 'error',
            message: 'Bad Request : Bad path parameters for request',
            data: {
              errors:
                [
                  {
                    type: 'field',
                    value: '12345',
                    msg: `${entity} id is not valid, must be a UUID version 4`,
                    path: 'id',
                    location: 'params'
                  },
                ]
            }
          }
        }
      }
    },
    '404': error404Schema,
    '500': error500Schema,
  }
};


export { deleteEntity };



