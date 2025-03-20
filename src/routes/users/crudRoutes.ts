import express from "express";
import recordExists from "../../middlewares/recordExists.js";
import noRecordForId from "../../middlewares/noRecordForId.js";
import crudForEntity from "../../controllers/api/crudForEntity.js";
import { ValidationChain } from 'express-validator';
import validate from "../../middlewares/validation/validationMiddleware.js";
import approvedBodyFields from "../../middlewares/validation/approvedBodyMiddleware.js";
import { getUserByValidator } from "../../validation/crud/users/getUserByValidator.js";
import { updateUserValidator } from "../../validation/crud/users/updateUserByIdValidator.js";
import path, { resolve } from 'path';
import { Entity } from '../../types/Entity.js';
import { fileURLToPath } from 'url';
import { byIdValidator } from "../../validation/common/byIdValidator.js";
import { getUserByIdValidator } from "../../validation/crud/users/getUserByIdValidator.js";
import isAuth from "../../middlewares/auth/isAuth.js";
import authorizeRole from "../../middlewares/auth/authorizeRole.js";
import authorize from "../../middlewares/auth/authorizeUser.js";
import authorizeUser from "../../middlewares/auth/authorizeUser.js";



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
  isAuth,
  authorizeRole(["ADMIN_ROLE", "FREE_USER"]),
  validate(byIdValidator as ValidationChain[]),
  noRecordForId(primaryEntity),
  crudForEntity);

router.get(`/${primaryEntity}/:id`,
  isAuth,
  authorizeRole(["ADMIN_ROLE", "FREE_USER"]),
  authorizeUser,
  validate(getUserByIdValidator as ValidationChain[]),
  crudForEntity);

router.get(`/${primaryEntity}/`,
  isAuth,
  authorizeRole(["ADMIN_ROLE", "FREE_USER"]),
  authorizeUser,
  validate(getUserByValidator as ValidationChain[]),
  crudForEntity);

router.patch(`/${primaryEntity}/:id`,
  isAuth,
  authorizeRole(["ADMIN_ROLE", "FREE_USER"]),
  authorizeUser,
  approvedBodyFields(['username', 'email', 'password']),
  validate(updateUserValidator as ValidationChain[]),
  noRecordForId(primaryEntity), recordExists(primaryEntity),
  crudForEntity);

/* get Records with Foreign Key*/
/*TODO : fill secondary primaryEntity value for db reaquest with Foreign Key*/
const secondaryEntity = 'secondaryEntity';

router.get(`/${secondaryEntity}/:id/${primaryEntity}`,
  isAuth,
  authorizeRole(["ADMIN_ROLE", "FREE_USER"]),
  authorizeUser,
  noRecordForId(primaryEntity),
  /*TODO : Create specific validator 'getENTITYValidator.ts' to import for action get records (With or without query string request) for an primaryEntity*/
  // validate(getENTITYValidator as ValidationChain[]),
  crudForEntity);


export default router;
