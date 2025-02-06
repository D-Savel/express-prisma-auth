import delUserTest from "./entity/delUserById.test.js";
import extractEntityFields from "../utils/db/extractEntityFields.js";
import getUsersTest from "./entity/getUsers.test.js";
import getUsersByIdTest from "./entity/getUserById.test.js";
import { Entity } from "../types/Entity.js";
import createRecordTest from "./entity/createRecord.test.js";

const param = process.argv.slice(-1);
const entityParam = param[0].replace('--', '');
console.log('PARAM: ', entityParam);
console.log('PARAM TAB: ', process.argv);

interface UserPayload {
  id: string;
  email: string;
  username: string;
  password: string;
}

const payload: UserPayload = {
  id: '3d180e19-4b3a-4038-811b-9225d2a678e9',
  email: 'moi@me.fr',
  username: 'moi',
  password: '1234'

};

const keys = await extractEntityFields(entityParam as Entity);
const createKeys = keys?.filter(key => key === 'username' || key === 'email');
console.log('PARAM in TESTS', entityParam);
console.log('KEYS in TESTS', keys);
createRecordTest(createKeys!, entityParam, { ['payload']: payload });
getUsersTest(keys!);
getUsersByIdTest(keys!);
delUserTest();