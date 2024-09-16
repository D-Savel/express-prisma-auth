import express from "express";

// import single route from directory
// ex: import ...Router from "./...Router";
import usersRouter from "./User/getUsers.js";
import createUserRouter from "./User/createUser.js";
import UpdateUserRouter from "./User/updateUserById.js";
import getUserByIdRouter from "./User/getUserById.js";
import expressRootRouter from "./root/expressRoot.js";
import delUserByIdRouter from './User/delUserById.js';



const router = express.Router();

router.use('', expressRootRouter);
router.use('', usersRouter);
router.use('', createUserRouter);
router.use('', UpdateUserRouter);
router.use('', getUserByIdRouter);
router.use('', delUserByIdRouter);

export default router;