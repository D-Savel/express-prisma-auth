import request, { Response } from "supertest";
import app from "../../server";
import { expect } from 'chai';
import _ from 'lodash';


describe('**** Users CRUD TEST ****', function () {
  let response: Response;

  describe("DEL USER BY ID", function () {
    const idValue = '6127b1a7-edf4-491f-af40-ea5b9495d3d8';
    before(async function () {
      return (
        response = await request(app)
          .del(`/api/users/${encodeURI(idValue)}`)
      );
    });
    it('it should return status 200', async function () {
      expect(response.status).equal(200);
    });
    it('it should return success for status key', async function () {
      expect(response.body.status).equal('success');
    });
    it('it should error is null in response', async function () {
      expect(response.body.errors).to.be.null;
    });
    it('it should data is null in response', async function () {
      expect(response.body.data).to.be.null;
    });
    it(`it should return status 422 for unexisting user when fetch user with id=${idValue}`, async function () {
      response = await request(app)
        .get(`/api/users/${encodeURI(idValue)}`);
      expect(response.status).equal(422);
    });
  });
});