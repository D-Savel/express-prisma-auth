
import capitalizeFirstLetter from "../../utils/common/capitalizeFirstLetter.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluralToSingular from "../../utils/common/pluralToSingular.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entity = path.basename(__dirname).split(path.sep).pop();

const recordsResponseExample = {
  summary: `an example of ${entity} response WITHOUT query string request`,
  value: {
    status: 'success',
    message: `${capitalizeFirstLetter(entity as string)} successfully retreived`,
    data: {
      [entity as string]: [
        {
          id: '6127b1a7-edf4-491f-af40-ea5b9495d3d8',
          username: "John",
          email: "jDoe@me.fr",
          password: "123Pasword"
        },
        {
          id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0',
          username: "Jane",
          email: "jane.Doe@me.fr",
          password: "Password123"
        },
        {
          id: '196cab8b-0284-4d0a-85c6-d171051b8966',
          username: "Emma",
          email: "EmmaDoe@me.fr",
          password: "Password"
        },
      ],
    },
    "errors": null
  }
};

const recordResponseExample = {
  summary: `An example of ${pluralToSingular(entity as string)} response`,
  value: {
    status: 'success',
    message: `1 record(s) received / 1 request(s) for ${entity as string}`,
    data: {
      [entity as string]: [
        {
          id: '6127b1a7-edf4-491f-af40-ea5b9495d3d8',
          username: "John",
          email: "jDoe@me.fr",
          password: "123Pasword"
        },
      ],
    },
    "errors": null
  }
};

const entityQueryExample = {
  summary: 'An example of users response WITH query string request (username=John&email=emmaDoe@me.fr) => Return only existing users from all queries made for each field ',
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
        username: 'Emma',
        email: 'EmmaDoe@me.fr',
        password: 'Password'
      },
      ],
    },
    "errors": null
  }
};

const noMatchResponse = {
  summary: `An example of ${pluralToSingular(entity as string)}(s) response for no matched record(s) for request`,
  value: {
    status: 'success',
    message: `no matched record(s) for ${pluralToSingular(entity as string)}(s) request`,
    data: {
      [entity as string]: []
    },
    "errors": null
  }
};

const recordsFieldsQueryExample = {
  summary: `An example of ${entity} response WITH only query string fields request(fields = id;email)`,
  value: {
    status: 'success',
    message: 'Users for query username=John&email=emmaDoe@me.fr successfully retreived',
    data: {
      [entity as string]: [{
        id: '6127b1a7-edf4-491f-af40-ea5b9495d3d8',
        email: 'jDoe@me.fr',
      },
      {
        id: '196cab8b-0284-4d0a-85c6-d171051b8966',
        email: 'EmmaDoe@me.fr'
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
    message: 'Bad Request: Bad parameters (Body,path,query string) for request',
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
    message: 'Bad Request: Bad parameters (Body,path,query string) for request',
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




export { recordResponseExample, recordsResponseExample, entityQueryExample, recordsFieldsQueryExample, Error400BodyExample, Error400IdExample, Error400BadBodyExample, noMatchResponse };;;;