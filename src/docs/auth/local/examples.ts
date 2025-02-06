
import capitalizeFirstLetter from "../../../utils/common/capitalizeFirstLetter.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluralToSingular from "../../../utils/common/pluralToSingular.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entity = path.basename(__dirname).split(path.sep).pop();

const loginResponseExample = {
  summary: `Response for login`,
  value: {
    user: {
      username: "John",
      email: "jDoe@me.fr",
    },
  },
  "errors": null
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

export { Error400BodyExample, loginResponseExample };