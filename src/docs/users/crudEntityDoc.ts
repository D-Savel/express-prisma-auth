import path from "node:path";
import { fileURLToPath } from "node:url";
import { error404Schema, error500Schema } from "../errors/errorsSchemas.js";
import capitalizeFirstLetter from "../../utils/common/capitalizeFirstLetter.js";
import pluralToSingular from "../../utils/common/pluralToSingular.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entity = path.basename(__dirname).split(path.sep).pop();

const ID_VALUE: string = "6127b1a7-edf4-491f-af40-ea5b9495d3d8";

const byIdParameters = {
  keyName: 'id',  // key for query string in path
  keyValue: ID_VALUE, // value for query string in path
};

const deleteRecordByIdForEntity = {
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
      "name": byIdParameters.keyName,
      "in": "path",
      "description": `${capitalizeFirstLetter(pluralToSingular(entity!))} id`,
      "type": "string",
      "default": byIdParameters.keyValue,
    }
  ],
  responses: {
    '200': {
      description: `${capitalizeFirstLetter(pluralToSingular(entity!))} deleted successfully!`,
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
                example: `${capitalizeFirstLetter(pluralToSingular(entity!))} with Id: ${byIdParameters.keyValue} has been successfully deleted`,
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

const getRecordByIdForEntity = {
  tags: [capitalizeFirstLetter(entity!)],
  summary: `Get a ${pluralToSingular(entity!)} on a single ID`,
  description: `Get a ${pluralToSingular(entity!)} on a single ID`,
  operationId: `get${capitalizeFirstLetter(pluralToSingular(entity!))}ById`,
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      "name": byIdParameters.keyName,
      "in": "path",
      "description": `${capitalizeFirstLetter(pluralToSingular(entity!))} id (uuid)`,
      "type": "string",
      "default": byIdParameters.keyValue,
    }
  ],
  responses: {
    '200': {
      description: `${capitalizeFirstLetter(pluralToSingular(entity!))} retrieved successfully or no matched record(s) for ${pluralToSingular(entity!)}`,
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
            example: {
              $ref: `#/components/examples/recordResponseExample`
            },
            noMatch: {
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
                  msg: `${pluralToSingular(entity!)} id is not valid, must be a UUID version 4`,
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

const getrecordsForEntity = {
  tags: [capitalizeFirstLetter(pluralToSingular(entity!))],
  summary: `Get list of ${(entity!)} (Get specific ${pluralToSingular(entity!)} and specific fields in response with optional query string parameters)`,
  description: `Get list of ${capitalizeFirstLetter(pluralToSingular(entity!))} without optional query string parameters \n\nGet several specific ${entity} with optional query string parameters => ex: username=...&email=... &id=...\n\nReceive only selected fields of an entity in response from a request with fields query string parameters  => ex: fields= id,username,email for user entity`,
  operationId: `get${capitalizeFirstLetter(entity!)} or get${capitalizeFirstLetter(entity!)}By`,
  security: [
    {
      bearerAuth: [],
    },
  ],
  "parameters": [
    {
      name: "id",
      in: "query",
      description: `${capitalizeFirstLetter(pluralToSingular(entity!))} id (uuid)`,
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
      description: `${capitalizeFirstLetter(pluralToSingular(entity!))} retrieved successfully or no matched record(s) for user`,
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
              $ref: '#/components/examples/recordssFieldsQueryExample'
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

const updateRecordForEntity = {
  tags: [capitalizeFirstLetter(entity!)],
  summary: `Update a ${pluralToSingular(entity!)}`,
  description: `Update a ${pluralToSingular(entity!)}`,
  operationId: `Update${capitalizeFirstLetter(pluralToSingular(entity!))}`,
  security: [
    {
      bearerAuth: [],
    },
  ],
  "parameters": [
    {
      "name": byIdParameters.keyName,
      "in": "path",
      "description": `${capitalizeFirstLetter(pluralToSingular(entity!))} id`,
      "type": "string",
      "default": byIdParameters.keyValue,
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${capitalizeFirstLetter(pluralToSingular(entity!))}UpdateBodySchema`,
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: `${capitalizeFirstLetter(pluralToSingular(entity!))} update successfully => return user(updated ${pluralToSingular(entity!)}) properties`,
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
                example: `${capitalizeFirstLetter(pluralToSingular(entity!))} for Id: 45cc8cdc-e36e-4970-af37-fee9088e2fb0 has been successfully updated`,
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
    '400': {
      description: 'Bad Request : Bad body or path parameters for request',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponseSchema' },
          examples: {
            Error400BodyExample: {
              $ref: '#/components/examples/Error400BodyExample'
            },
            error400IdExample: {
              $ref: '#/components/examples/Error400IdExample'
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

export { deleteRecordByIdForEntity, getRecordByIdForEntity, getrecordsForEntity, updateRecordForEntity };
