import express from "express";
import { ValidationChain } from 'express-validator';
import validate from "../../middlewares/validation/validationMiddleware.js";
import { createUserValidator } from "../../validation/users/createUserValidator.js";
import createEntity from "../../controllers/api/entity/createEntity.js";
import approvedFields from "../../middlewares/validation/approvedBodyMiddleware.js";
import entityExists from "../../middlewares/entityExists.js";
import { Prisma } from "@prisma/client";
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entity = path.basename(__dirname) as Partial<Uncapitalize<Prisma.ModelName>>;
console.log('ENTITY in route', entity);


router.post('/api/users', approvedFields(['id', 'username', 'email', 'password']), validate(createUserValidator as ValidationChain[]), entityExists(entity!), createEntity);

export default router;