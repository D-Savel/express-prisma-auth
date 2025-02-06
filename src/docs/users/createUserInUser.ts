import { error404Schema, error500Schema } from "../errors/errorsSchemas.js";

const createUserInUser = {
  tags: ['Users'],
  summary: 'Use api/v1/auth/local/register/users route to create a new user => See auth API',
  description: 'Unused route',
  operationId: 'createUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '404': error404Schema,
  }
};


export { createUserInUser };