import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';

describe('**** Users CRUD TEST ****', function () {
  const userObjectKeys = ['id', 'username', 'email', 'password', 'createdAt', 'updatedAt'];
  let response: Response;

  describe("Get USER BY ID", function () {
    const idValue = 'fd8234f3-31e5-4b3e-9e48-99dddf8a55c6';
    before(async function () {
      return (
        response = await request(app)
          .get(`/api/users/${encodeURI(idValue)}`)
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
    it(`it should user to be an object in data.user response containing ${(userObjectKeys.length)} keys: ${(userObjectKeys)}`, async function () {
      expect(response.body.data.user).to.be.an('object');
      expect(response.body.data.user).to.have.all.keys([...userObjectKeys]);
      expect(response.body.data.user.id).equal(idValue);
    });
  });
});