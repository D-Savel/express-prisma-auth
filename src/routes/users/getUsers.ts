import express from "express";
import getUsersByQueryString from "../../controllers/api/users/getUsersByQueryString";
import validate from "../../middlewares/validation/validationMiddleware";
import { getUserByValidator } from "../../validation/users/getUserByValidator";
import isQueryString from "../../middlewares/users/isQueryString";
import { ValidationChain } from "express-validator";
const router = express.Router();

//Apply isQueryString middleware to redirect query string request

router.get('/api/users', isQueryString, validate(getUserByValidator as ValidationChain[]), getUsersByQueryString);



export default router;