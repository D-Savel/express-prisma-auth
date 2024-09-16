import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';

describe('**** Users CRUD TEST ****', function () {
  const userObjectKeys = ['id', 'username', 'email', 'password'];
  let response: Response;

  describe("GET USERS", function () {
    before(async function () {
      return (
        response = await request(app)
          .get(`/api/users`)
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
    it(`it should all user object in array data.users response containing ${(userObjectKeys.length)} keys: (${(userObjectKeys)})`, async function () {
      for (const user of response.body.data.users) {
        expect(user).to.have.all.keys([...userObjectKeys]);
      }
    });
  });
});