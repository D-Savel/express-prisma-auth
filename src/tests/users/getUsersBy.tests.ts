import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';

//Define fields for query string
interface Fields {
  id: string;
  username: string;
  email: string;
}

//Define keys of Tested entity (Users here)
const userObjectKeys = ['id', 'username', 'email', 'password'];


/** General function for testing query string request with one parameter
 * Params: userFields = array of object representing query string
 * example:[{ username: 'Jane' }, { email: 'emmaDoe@me.fr' }, { id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0' }]
 * For query string => username=Jane&email=emmaDoe@me.fr&id=45cc8cdc-e36e-4970-af37-fee9088e2fb0
 */
function getUserByTest(userFields: Partial<Fields>[]) {
  let response: Response;
  let queryString: string = '';

  for (const field of userFields) {
    queryString += `${Object.keys(field)[0]}=${Object.values(field)[0]}&`;
  }
  before(async function () {
    return (
      response = await request(app)
        .get(`/api/users?${queryString}`)
    );
  });
  it('it should return status 200', async function () {
    expect(response.status).equal(200);
  });
  it('it should status equal to \'success\' in response ', async function () {
    expect(response.body.status).equal('success');
  });
  it('it should error is null in response', async function () {
    expect(response.body.errors).is.null;
  });
  it('it should users to be an array of object in data response', async function () {
    expect(response.body.data.users).to.be.an('array');
    for (const user of response.body.data.users) {
      expect(user).to.be.an('object');
    }
  });
  it(`it should user object in array data.users response containing ${userObjectKeys.length} keys: (${userObjectKeys})`, async function () {
    for (const user of response.body.data.users) {
      expect(user).to.have.all.keys([...userObjectKeys]);
    }
  });
  it(`it should one of user object in array data.users response have properties ${queryString.replace('=', ': ')}`, async function () {
    //Use lodash library to check if the predicate returns true any element of an array
    // _.some(array, [predicate])
    //predicate(Function) parameter holds the function invoked per iteration
    for (const field of userFields) {
      expect(_.some(response.body.data.users, field)).to.be.true;
    }
  });
}

/**General function for testing query string request error with one unexisting parameter
* Params: userFields = array of object representing query string
* example:[{ username: 'Jane' }, { email: 'emmaDoe@me.fr' }, { id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0' }]
* For query string => username=Jane&email=emmaDoe@me.fr&id=45cc8cdc-e36e-4970-af37-fee9088e2fb0
 */
function getUserByError422Test(userFields: Partial<Fields>[]) {
  let response: Response;
  let queryString: string = '';

  for (const field of userFields) {
    queryString += `${Object.keys(field)[0]}=${Object.values(field)[0]}&`;
  }
  before(async function () {
    return (
      response = await request(app)
        .get(`/api/users?${queryString}`)
    );
  });
  it('it should return status 422 for unexisting username in query', async function () {
    expect(response.status).equal(422);
  });
  it(`it should message string in response includes No user(s) match(es) with query string: ${queryString.slice(0, -1)}`, async function () {
    expect(response.body.errors).includes(`No user(s) match(es) with query string: ${queryString.slice(0, -1)}`);
  });
}



describe('**** Users CRUD TEST ****', function () {
  const userObjectKeys = ['id', 'username', 'email', 'password'];
  let response: Response;

  describe("GET USERS BY (id, username, email)", function () {
    describe("GET USERS BY for existing id", function () {
      getUserByTest([{ id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0' }]);
    });
    describe("GET USERS BY for existing username", function () {
      getUserByTest([{ username: 'Emma' }]);
    });
    describe("GET USERS BY for existing email", function () {
      const emailValue = 'john.doe@me.fr';
      getUserByTest([{ email: 'jane.doe@me.fr' }]);
    });
    describe("GET  USERS BY for existing username and email an id", function () {
      getUserByTest([{ username: 'Jane' }, { email: 'emmaDoe@me.fr' }, { id: '45cc8cdc-e36e-4970-af37-fee9088e2fb0' }]);
    });
    describe("GET  USERS BY for unexisting id in query", function () {
      getUserByError422Test([{ id: '45cc8cdc-e36e-4970-af37-fee9088e2fb9' }]);
    });
    describe("GET  USERS BY for unexisting username in query", function () {
      getUserByError422Test([{ username: 'Johny' }]);
    });
    describe("GET  USERS BY for unexisting email in query", function () {
      getUserByError422Test([{ email: 'emma@me.fr' }]);
    });
    describe("GET  USERS BY for unexisting id, username and email in query", function () {
      getUserByError422Test([{ id: '45cc8cdc-e36e-4970-af37-fee9088e2fb9' }, { username: 'Johny' }, { email: 'emma@me.fr' }]);
    });
  });
});