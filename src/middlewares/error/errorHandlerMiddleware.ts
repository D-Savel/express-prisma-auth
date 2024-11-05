import { ErrorRequestHandler } from "express";
import { CustomError } from "../../utils/errors/CustomError.js";
import winstonLogger from "../../config/winston/winston.js";
import { sendError } from "../../utils/express/sendError.js";
import { RequestValidationError } from "../../errors/RequestValidationError.js";

const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  if (error && error instanceof CustomError) {
    winstonLogger.error(error instanceof RequestValidationError ? `${error.errorDetail}\n${JSON.stringify(error.formatErrors())}` : `${error} => ${error.errorDetail}`);
    return sendError(res, error.statusCode, error instanceof RequestValidationError ? 'Bad Request : Bad parameters (Body,path,query string) for request' : error.message, error instanceof RequestValidationError ? error.formatErrors() as any : error.errorDetail || 'none');
  }
  if (error && error instanceof Error) {
    winstonLogger.error(`Node server error \n ${error.stack!}`);
    return sendError(res, 500, `Node server error`, `  Node error \n ${error.stack!}`);
  }
};

export default errorHandler;