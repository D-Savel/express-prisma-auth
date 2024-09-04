import express from "express";

// import single route from directory
// ex: import ...Router from "./...Router";
import usersRouter from "./users/getUsers";
import createUserRouter from "./users/createUser";
import UpdateUserRouter from "./users/updateUserById";
import getUserByIdRouter from "./users/getUserById";
import expressRootRouter from "./root/expressRoot";
import delUserByIdRouter from './users/delUserById';



const router = express.Router();

router.use('', expressRootRouter);
router.use('', usersRouter);
router.use('', createUserRouter);
router.use('', UpdateUserRouter);
router.use('', getUserByIdRouter);
router.use('', delUserByIdRouter);

export default router;