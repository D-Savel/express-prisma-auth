import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { sendSuccess } from '../../utils/express/sendSuccess';

dotenv.config();
const PORT = process.env.PORT || 9000;
const expressStatusController = (req: Request, res: Response) => {
  sendSuccess(res, 200, `Node server is alive`, { status: `😓  😺  Hello World ! - Express server is running on ${PORT} - great!!  😺  😓` });
};

export default expressStatusController

