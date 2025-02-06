import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';


export default function getUsersByIdTest(keys: string[]) {
  describe('**** Users CRUD TEST ****', function () {

    let response: Response;

    describe("Get USER BY ID", function () {
      const idValue = '3d180e19-4b3a-4038-811b-9225d2a678e7';
      before(async function () {
        return (
          response = await request(app)
            .get(`/api/v1/users/${encodeURI(idValue)}`)
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
      it(`it should user to be an object in data.user response containing ${(keys.length)} keys: ${[...keys]}`, async function () {
        expect(response.body.data.users).to.be.an('object');
        expect(response.body.data.users).to.have.all.keys([...keys]);
        expect(response.body.data.users.id).equal(idValue);
      });
    });
  });
}