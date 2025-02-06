const UserLoginBodySchema = {
  type: 'object',
  properties: {
    payload: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          required: true,
          example: 'johnny@mail.me',
        },
        password: {
          type: 'string',
          required: true,
          description: "unencrypted user's password",
          example: '!1234Johnny#',
        },
      }
    }
  }
};

export { UserLoginBodySchema };