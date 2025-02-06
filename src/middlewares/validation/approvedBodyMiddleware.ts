import { Request, Response, NextFunction } from 'express';
import BodyRequestValidationError from '../../errors/BodyRequestValidationError.js';

const approvedBodyMiddleware = (approvedFields: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    console.log('In approove body middleware', req.body.payload);
    const keys = Object.keys(req.body.payload);
    const invalidFields = keys.filter(key => !approvedFields.includes(key));

    if (invalidFields.length === 0) {
      next();
    } else {
      throw new BodyRequestValidationError(`Invalid field(s): ${invalidFields.join(', ')}`, 'Invalid field(s) in request with query string');
    };
  };
};

export default approvedBodyMiddleware;