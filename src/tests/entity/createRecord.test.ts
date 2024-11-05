import request, { Response } from "supertest";
import app from "../../server.js";
import { expect } from 'chai';
import _ from 'lodash';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import singularToPlural from "../../utils/common/singularToPlural.js";
import { Entity } from "../../types/Entity.js";
import { Prisma } from "@prisma/client";


export default function createRecordTest(keys: string[], entityParam: string, payload: any) {
  describe(`**** USER CRUD TEST ****`, function () {

    let response: Response;

    describe("CREATE", function () {
      // const id = '3d180e19-4b3a-4038-811b-9225d2a678e7';
      // const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
      // const email = `${username}@email.me`;
      // const password = `${username}1234`;
      // let payload = {
      //   payload: {
      //     id,
      //     email,
      //     username,
      //     password
      //   }
      // };
      before(async function () {
        return (response = await request(app)
          .post(`/api/${singularToPlural(entityParam)}`)
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
      it(`it should user to be an object in data.${singularToPlural(entityParam)} response result containing ${keys!.length} keys: ${[...keys]}`, async function () {
        expect(response!.body.data[singularToPlural(entityParam)]).to.be.an('object');
        expect(response.body.data[singularToPlural(entityParam)]).to.have.all.keys([...keys!]);
        if (keys.includes('id')) expect(response.body.data[singularToPlural(entityParam)].id).to.be.a.string;
        for (const key of keys) {
          let entityKey = key;
          console.log('payload', payload);
          console.log('Email type', typeof payload.email);
          console.log(Prisma.ModelName.User);
          console.log('key', key);
          expect(response.body.data[singularToPlural(entityParam)][key]).equal(payload[entityKey]);
        }
      });
    });
  });
};;
