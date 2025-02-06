import express from "express";
import recordExists from "../../middlewares/recordExists.js";
import noRecordForId from "../../middlewares/noRecordForId.js";
import crudForEntity from "../../controllers/api/crudForEntity.js";
import { ValidationChain } from 'express-validator';
import validate from "../../middlewares/validation/validationMiddleware.js";
import approvedBodyFields from "../../middlewares/validation/approvedBodyMiddleware.js";
import { getUserByValidator } from "../../validation/crud/users/getUserByValidator.js";
import { updateUserValidator } from "../../validation/crud/users/updateUserByIdValidator.js";
import path from 'path';
import { Entity } from '../../types/Entity.js';
import { fileURLToPath } from 'url';
import { byIdValidator } from "../../validation/common/byIdValidator.js";
import { getUserByIdValidator } from "../../validation/crud/users/getUserByIdValidator.js";
import isAuth from "../../middlewares/auth/isAuth.js";
import dataUserAuth from "../../middlewares/auth/authorize.js";
import authorize from "../../middlewares/auth/authorize.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const primaryEntity = path.basename(__dirname).split(path.sep).pop() as Partial<Entity>;

const router = express.Router();

/* Use auth/register/users route fort POST request to register user */
// router.post(`/${primaryEntity}/`,
//   approvedBodyFields(['id', 'username', 'email', 'password']),
//   validate(createUserValidator as ValidationChain[]),
//   recordExists(primaryEntity),
//   crudForEntity);

router.delete(`/${primaryEntity}/:id`,
  validate(byIdValidator as ValidationChain[]),
  noRecordForId(primaryEntity),
  isAuth,
  authorize,
  crudForEntity);

router.get(`/${primaryEntity}/:id`,
  validate(getUserByIdValidator as ValidationChain[]),
  isAuth,
  authorize,
  crudForEntity);

router.get(`/${primaryEntity}/`,
  validate(getUserByValidator as ValidationChain[]),
  isAuth,
  authorize,
  crudForEntity);

router.patch(`/${primaryEntity}/:id`,
  approvedBodyFields(['username', 'email', 'password']),
  validate(updateUserValidator as ValidationChain[]),
  noRecordForId(primaryEntity), recordExists(primaryEntity),
  isAuth,
  authorize,
  crudForEntity);

/* get Records with Foreign Key*/
/*TODO : fill secondary primaryEntity value for db reaquest with Foreign Key*/
const secondaryEntity = 'secondaryEntity';

router.get(`/${secondaryEntity}/:id/${primaryEntity}`,
  noRecordForId(primaryEntity),
  /*TODO : Create specific validator 'getENTITYValidator.ts' to import for action get records (With or without query string request) for an primaryEntity*/
  // validate(getENTITYValidator as ValidationChain[]),
  isAuth,
  authorize,
  crudForEntity);


export default router;
