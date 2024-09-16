import express from "express";
import validate from "../../middlewares/validation/validationMiddleware.js";
import delUserById from "../../controllers/api/entity/delEntityById.js";
import { delUserByIdValidator } from "../../validation/users/delUserByIdValidator.js";
import { ValidationChain } from "express-validator";
import entityExists from "../../middlewares/entityExists.js";

const router = express.Router();

router.delete('/api/users/:id', validate(delUserByIdValidator as ValidationChain[]), entityExists, delUserById);

export default router;