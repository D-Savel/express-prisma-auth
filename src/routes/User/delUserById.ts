import express from "express";
import validate from "../../middlewares/validation/validationMiddleware.js";
import delById from "../../controllers/api/entity/delEntityById.js";
import { delUserByIdValidator } from "../../validation/users/delUserByIdValidator.js";
import { ValidationChain } from "express-validator";
import entityNotMatches from "../../middlewares/entityNotMatches.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { Prisma } from "@prisma/client";


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entity = path.basename(__dirname) as Partial<Uncapitalize<Prisma.ModelName>>;

router.delete('/api/users/:id', validate(delUserByIdValidator as ValidationChain[]), entityNotMatches(entity!), delById);

export default router;