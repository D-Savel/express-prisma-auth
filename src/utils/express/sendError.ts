import { Response } from "express";

export const sendError = async (res: Response, codeStatus: number, message: string, errorDetail: string) => {
  res.status(codeStatus).send({ status: 'error', message, data: null, errors: errorDetail });
};
