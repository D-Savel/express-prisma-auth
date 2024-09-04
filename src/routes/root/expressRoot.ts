import express from "express";

import expressStatusController from "../../controllers/express/expressStatus";
// import {...} from "../controllers/...";

const router = express.Router();

/** GET Methods */
/**
* @openapi
* '/':
*  get:
*     tags:
*     - express controller
*     summary: express startup message
*     responses:
*      200:
*        description: express server started
*      404:
*        description: Route not Found
*        content:
*         application/json:
*          schema:
*           $ref: '#/components/schemas/ErrorResponse'
*      500:
*        description: Node Server Error
*        content:
*         application/json:
*          schema:
*           $ref: '#/components/schemas/Error500'
* components:
*  schemas:
*    ErrorResponse:
*      type: object
*      properties:
*        status:
*          type: string
*          example: 'error'
*        message:
*          type: string
*          example: 'Route not found'
*        data:
*          type: string
*          nullable: true
*          example: 'null'
*        error_detail:
*          type: string
*          example: "Route doesn't exist"
*    Error500:
*      type: object
*      properties:
*        status:
*          type: string
*          example: 'error'
*        message:
*          type: string
*          example: 'Node server error'
*        data:
*          type: string
*          nullable: true
*          example: 'null'
*        error_detail:
*          type: string
*          example: "Node error \n ${error.stack!}"
*/

router.get('/', expressStatusController);


export default router;