import express from "express";

import expressStatusController from "../../controllers/express/expressStatus.js";
// import {...} from "../controllers/...";

const router = express.Router();

router.get('/', expressStatusController);


export default router;