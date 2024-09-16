import express from "express";
import getUsersByQueryString from "../../controllers/api/entity/getAllEntityByQueryString.js";
import validate from "../../middlewares/validation/validationMiddleware.js";
import { getUserByValidator } from "../../validation/users/getUserByValidator.js";
import isQueryString from "../../middlewares/users/isQueryString.js";
import { ValidationChain } from "express-validator";
const router = express.Router();

//Apply isQueryString middleware to redirect query string request

router.get('/api/users', isQueryString, validate(getUserByValidator as ValidationChain[]), getUsersByQueryString);



export default router;