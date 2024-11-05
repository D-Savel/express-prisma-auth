import express from "express";

// import single route from directory
// ex: import ...Router from "./...Router";


/** express root Import */
import expressRootRouter from "./root/expressRoot.js";

// /** User Import*/
import usersCrudRouter from "./users/crudRoutes.js";

/** Story Import*/
import storiesCrudRouter from "./stories/crudRoutes.js";

const router = express.Router();

/*Express routes*/
router.use('', expressRootRouter);

/*User routes*/
router.use('', usersCrudRouter);

/*Story routes*/
router.use('', storiesCrudRouter);

export default router;