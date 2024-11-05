import express from "express";

import recordExists from "../../middlewares/recordExists.js";
import noRecordForId from "../../middlewares/noRecordForId.js";
import validate from "../../middlewares/validation/validationMiddleware.js";
import approvedBodyFields from "../../middlewares/validation/approvedBodyMiddleware.js";
import { createUserValidator } from "../../validation/crud/users/createUserValidator.js";
import { byIdValidator } from "../../validation/common/byIdValidator.js";
import { updateUserValidator } from "../../validation/crud/users/updateUserByIdValidator.js";
import path from 'path';
import { Entity } from '../../types/Entity.js';
import { fileURLToPath } from 'url';
import { ValidationChain } from "express-validator";
import crudForEntity from "../../controllers/api/crudForEntity.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const primaryEntity = path.basename(__dirname).split(path.sep).pop() as Partial<Entity>;

const router = express.Router();

router.post(`/api/${primaryEntity}/`,
  approvedBodyFields(['id', 'username', 'email', 'password']),
  validate(createUserValidator as ValidationChain[]),
  recordExists(primaryEntity),
  crudForEntity);

router.delete(`/api/${primaryEntity}/:id`,
  validate(byIdValidator as ValidationChain[]),
  noRecordForId(primaryEntity),
  crudForEntity);

router.get(`/api/${primaryEntity}/:id`,
  validate(byIdValidator as ValidationChain[]),
  noRecordForId(primaryEntity),
  crudForEntity);

router.get(`/api/${primaryEntity}/`,
  // validate(getbyValidator as ValidationChain[]),
  crudForEntity);

router.patch(`/api/${primaryEntity}/:id`,
  approvedBodyFields(['username', 'email', 'password']),
  validate(updateUserValidator as ValidationChain[]),
  noRecordForId(primaryEntity), recordExists(primaryEntity),
  crudForEntity);


/*TODO : fill secondary primaryEntity value for db reaquest with Foreign Key*/
const secondaryEntity = 'secondaryEntity';
// if (secondaryEntity === 'secondaryEntity') throw new Error('secondary entity for foreign key request is not fill: Please fill secondary entity (foreign entity) or delete route');

router.get(`${secondaryEntity}/:id/${primaryEntity}`,
  noRecordForId(primaryEntity),
  /*TODO : Create specific validator 'getENTITYValidator.ts' to import for action get records (With or without query string request) for an primaryEntity*/
  // validate(getENTITYValidator as ValidationChain[]),
  crudForEntity);


export default router;