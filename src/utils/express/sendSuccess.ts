import { Response } from "express";

export const sendSuccess = async (res: Response, codeStatus: number, message: string, data: Object | null) => {
  res.status(codeStatus).send({ status: 'success', message, data, errors: null });
};
