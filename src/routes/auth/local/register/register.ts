import express, { Request, Response, NextFunction } from 'express';
import approvedBodyFields from "../../../../middlewares/validation/approvedBodyMiddleware.js";
import { createUserValidator } from '../../../../validation/crud/users/createUserValidator.js';
import { ValidationChain } from 'express-validator';
import validate from '../../../../middlewares/validation/validationMiddleware.js';
import recordExists from '../../../../middlewares/recordExists.js';
import crudForEntity from '../../../../controllers/api/crudForEntity.js';
const router = express.Router();

router.post(`/auth/local/register/users`,
  approvedBodyFields(['id', 'username', 'email', 'password']),
  validate(createUserValidator as ValidationChain[]),
  recordExists('user'),
  crudForEntity);

export default router;

