const usersExample = {
  summary: 'an example of users response WITHOUT query string request',
  value: {
    status: 'success',
    message: 'Users successfully retreived',
    data: {
      "users": [
        {
          id: '6127b1a7-edf4-491f-af40-ea5b9495d3d8',
          username: "John",
          email: "jDoe@me.fr",
          password: "123Pasword"
        },
        {
          id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0',
          username: "Jane", email: "jane.Doe@me.fr",
          password: "Password123"
        },
        {
          id: '196cab8b-0284-4d0a-85c6-d171051b8966',
          username: "Emma", email: "EmmaDoe@me.fr",
          password: "Password"
        },
      ],
    },
    "errors": null
  }
};



const usersQueryExample = {
  summary: 'An example of users response WITH query string request (username=John&email=emmaDoe@me.fr)',
  value: {
    status: 'success',
    message: 'Users for query username=John&email=emmaDoe@me.fr successfully retreived',
    data: {
      users: [{
        id: '6127b1a7-edf4-491f-af40-ea5b9495d3d8',
        username: 'John',
        email: 'jDoe@me.fr',
        password: '123Pasword'
      },
      {
        id: '196cab8b-0284-4d0a-85c6-d171051b8966',
        username: '\"Emma\", email: \"EmmaDoe@me.fr\"',
        password: 'Password'
      },
      ],
    },
    "errors": null
  }
};



const Error400BodyExample = {
  summary: 'An example of response for body error with body value : username=\'\' and invalid email=\'emma@mail\'',
  value: {
    status: 'error',
    message: 'Bad Request: Bad body or path parameters for request',
    data: null,
    errors:
      [
        {
          type: 'field',
          value: '',
          msg: `username is required`,
          path: 'username',
          location: 'body'
        },
        {
          type: 'field',
          value: 'emma@mail',
          msg: "Please provide valid email",
          path: 'email',
          location: 'body'
        }
      ]
  }
};




const Error400IdExample = {
  summary: 'An example of response for path error with invalid uuid id value = 12345 ',
  value: {
    status: 'error',
    message: 'Bad Request: Bad body or path parameters for request',
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
      ]
  }
};




const Error400BadBodyExample = {
  summary: 'An example of response for body error with invalid key in body = emaile ',
  value: {
    status: 'error',
    message: 'Invalid request body parameter(s)',
    data: null,
    errors: "Invalid field(s): emaile"
  }
};




export { usersExample, usersQueryExample, Error400BodyExample, Error400IdExample, Error400BadBodyExample };