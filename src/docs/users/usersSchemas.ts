const UserBodySchema = {
  type: 'object',
  properties: {
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6127b1a7-edf4-491f-af40-ea5b9495d3d8'
        },
        username: {
          type: 'string',
          example: 'Johnny',
        },
        email: {
          type: 'string',
          example: 'johnny@email.com',
        },
        password: {
          type: 'string',
          description: "unencrypted user's password",
          example: '!1234Johnny#',
        }
      }
    }
  }
};

const UserUpdateBodySchema = {
  type: 'object',
  properties: {
    payload: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Sahra',
        },
        email: {
          type: 'string',
          example: 'sahra@email.com',
        },
        password: {
          type: 'string',
          description: "unencrypted user's password",
          example: '!1234Sahra',
        }
      }
    }
  }
};

const UserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'new random created uuid',
    },
    username: {
      type: 'string',
      example: 'Johnny',
    },
    email: {
      type: 'string',
      example: 'johnny@email.com',
    },
    password: {
      type: 'string',
      description: "unencrypted user's password",
      example: '!1234Johnny#',
    }
  }
};


const UserResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    data: {
      type: 'object',
      properties: {
        "users": {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'new random created uuid',
            },
            username: {
              type: 'string',
              example: 'Johnny',
            },
            email: {
              type: 'string',
              example: 'johnny@email.com',
            },
            password: {
              type: 'string',
              description: "unencrypted user's password",
              example: '!1234Johnny#',
            }
          },
        }
      }
    },
    errors: {
      type: 'null',
      example: null
    }
  }
};


const UsersResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    data: {
      type: 'object',
      properties: {
        "users": {
          type: 'array',
          items: {
            type: 'object',
            $ref: '#/components/schemas/UserSchema'
          }
        }
      }
    },
    errors: {
      type: 'null',
      example: null
    }
  }
};

const ErrorResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    data: {
      type: null,
    },
    errors: {
      type: 'array',
    }
  }
};


export {
  UserBodySchema, UserResponseSchema, UserSchema,
  UsersResponseSchema, UserUpdateBodySchema, ErrorResponseSchema
};