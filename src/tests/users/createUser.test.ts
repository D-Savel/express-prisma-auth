import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export default function createUserTest() {
  describe(`**** USER CRUD TEST ****`, function () {

    let response: Response;
    let userObjectKeys: string[] = ['id', 'username', 'email', 'password', 'createdAt', 'updatedAt'];


    describe("CREATE", function () {
      const id = '3d180e19-4b3a-4038-811b-9225d2a678e7';
      const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
      const email = `${username}@email.me`;
      const password = `${username}1234`;
      let payload = {
        payload: {
          id,
          email,
          username,
          password
        }
      };
      before(async function () {
        return (response = await request(app)
          .post(`/api/users`)
          .send(payload)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
        );
      });
      it('it should return status 201', async function () {
        expect(response.status).equal(201);
      });
      it('it should return success for status key', async function () {
        expect(response!.body.status).equal('success');
      });
      it('it should error is null in response.result', async function () {
        expect(response!.body.errors).is.null;
      });
      it(`it should user to be an object in data.user response.result containing ${(userObjectKeys!.length)} keys: ${(userObjectKeys)}`, async function () {
        expect(response!.body.data.user).to.be.an('object');
        expect(response.body.data.user).to.have.all.keys([...userObjectKeys!]);
        expect(response.body.data.user.username.toLowerCase()).equal(username);
        expect(response.body.data.user.email).equal(email);
        expect(response.body.data.user.password).equal(password);
        expect(response.body.data.user.id).to.be.a.string;
      });
    });
  });
}
