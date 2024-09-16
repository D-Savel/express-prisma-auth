import express, { Request } from "express";
import validate from "../../middlewares/validation/validationMiddleware.js";
import { getUserByIdValidator } from "../../validation/users/getUserByIdValidator.js";
import { ValidationChain } from "express-validator";
import getById from "../../controllers/api/entity/getEntityById.js";
import entityNotMatches from "../../middlewares/entityNotMatches.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { Prisma } from "@prisma/client";



const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entity = path.basename(__dirname) as Partial<Uncapitalize<Prisma.ModelName>>;

router.get('/api/users/:id', validate(getUserByIdValidator as ValidationChain[]), entityNotMatches(entity!), getById);

export default router;