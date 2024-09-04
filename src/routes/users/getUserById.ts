import express from "express";
import validate from "../../middlewares/validation/validationMiddleware";
import getUserById from "../../controllers/api/users/getUserById";
import { getUserByIdValidator } from "../../validation/users/getUserByIdValidator";
import { ValidationChain } from "express-validator";
// import {...} from "../controllers/...";
// import {...Validator} from "../validators/...";

const router = express.Router();

router.get('/api/users/:id', validate(getUserByIdValidator), getUserById);

export default router;