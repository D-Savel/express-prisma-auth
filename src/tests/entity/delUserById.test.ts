import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';

export default function delUserTest() {
  describe('**** Users CRUD TEST ****', function () {
    let response: Response;

    describe("DEL USER BY ID", function () {
      const id = '3d180e19-4b3a-4038-811b-9225d2a678e7';
      before(async function () {
        return (
          response = await request(app)
            .del(`/api/users/${encodeURI(id)}`)
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
      it(`it should return status 422 for unexisting user when fetch user with id=${id}`, async function () {
        response = await request(app)
          .get(`/api/users/${encodeURI(id)}`);
        expect(response.status).equal(422);
      });
    });
  });
}