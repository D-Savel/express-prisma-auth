import express from "express";
import validate from "../../middlewares/validation/validationMiddleware.js";
import updateEntityById from "../../controllers/api/entity/updateEntityById.js";
import { updateUserValidator } from "../../validation/users/updateUserByIdValidator.js";
import { ValidationChain } from "express-validator";
import approvedFields from "../../middlewares/validation/approvedBodyMiddleware.js";
import entityExists from "../../middlewares/entityExists.js";
import entityNotMatches from "../../middlewares/entityNotMatches.js";
import { Prisma } from "@prisma/client";
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entity = path.basename(__dirname) as Partial<Uncapitalize<Prisma.ModelName>>;

router.put('/api/users/:id', approvedFields(['username', 'email', 'password']), validate(updateUserValidator as ValidationChain[]), entityNotMatches(entity!), entityExists(entity!), updateEntityById);

export default router;

