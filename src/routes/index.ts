import express from "express";

// import single route from directory
// ex: import ...Router from "./...Routes.js";


/** express root Import */
import expressRootRouter from "./root/expressRoot.js";

// /** User Import*/
import usersCrudRouter from "./users/crudRoutes.js";

/** Post Import*/
import postsCrudRouter from "./posts/crudRoutes.js";

/** Auth Import*/
import registerRouter from "./auth/local/register/register.js";
import loginRouter from "./auth/local/login/login.js";
import logoutRouter from "./auth/local/logout/logout.js";
import refreshTokenRouter from "./auth/local/refreshToken/refreshToken.js";

const router = express.Router();

/*Express routes*/
router.use('', expressRootRouter);

/*User routes*/
router.use('/api/v1', usersCrudRouter);

/*Post routes*/
router.use('/api/v1', postsCrudRouter);

/*Auth routes*/
router.use('/api/v1', registerRouter);
router.use('/api/v1', loginRouter);
router.use('/api/v1', refreshTokenRouter);
router.use('/api/v1', logoutRouter);

export default router;