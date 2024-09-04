import express from "express";
import validate from "../../middlewares/validation/validationMiddleware";
import updateUserById from "../../controllers/api/users/updateUserById";
import { updateUserValidator } from "../../validation/users/updateUserByIdValidator";
import { ValidationChain } from "express-validator";
import approvedFields from "../../middlewares/validation/approvedBodyMiddleware";
import userExists from "../../middlewares/validation/users/userExists";
// import {...} from "../controllers/...";

const router = express.Router();

router.put('/api/users/:id', approvedFields(['username', 'email', 'password']), userExists, validate(updateUserValidator as ValidationChain[]), updateUserById);

export default router;

