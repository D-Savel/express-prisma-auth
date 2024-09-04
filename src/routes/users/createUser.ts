import express from "express";
import { ValidationChain } from 'express-validator';
import validate from "../../middlewares/validation/validationMiddleware";
import { createUserValidator } from "../../validation/users/createUserValidator";
import createUser from "../../controllers/api/users/createUser";
import approvedFields from "../../middlewares/validation/approvedBodyMiddleware";
import userExists from "../../middlewares/validation/users/userExists";
// import {...} from "../controllers/...";

const router = express.Router();

router.post('/api/users', approvedFields(['username', 'email', 'password']), userExists, validate(createUserValidator as ValidationChain[]), createUser);

export default router;