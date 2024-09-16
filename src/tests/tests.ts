import createUserTest from "./users/createUser.test.js";
import delUserTest from "./users/delUserById.test.js";
import extractEntityKeys from "../utils/db/extractEntityKeys.js";
import { Prisma } from '@prisma/client';

const entities = ['user'];
const entityTest = entities[0] as Uncapitalize<Prisma.ModelName>;


const keys = await extractEntityKeys(entityTest);
console.log('KEYS in TESTS', keys);
createUserTest();
delUserTest();


