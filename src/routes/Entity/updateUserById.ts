import express from "express";
import validate from "../../middlewares/validation/validationMiddleware.js";
import updateUserById from "../../controllers/api/entity/updateEntityById.js";
import { updateUserValidator } from "../../validation/users/updateUserByIdValidator.js";
import { ValidationChain } from "express-validator";
import approvedFields from "../../middlewares/validation/approvedBodyMiddleware.js";
import entityExists from "../../middlewares/entityExists.js";
// import {...} from "../controllers/...";

const router = express.Router();

router.put('/api/users/:id', approvedFields(['username', 'email', 'password']), entityExists('user'), validate(updateUserValidator as ValidationChain[]), updateUserById);

export default router;

