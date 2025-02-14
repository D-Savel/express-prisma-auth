import { Request, Response, NextFunction } from 'express';
import BodyRequestValidationError from '../../errors/BodyRequestValidationError.js';

const approvedBodyMiddleware = (approvedFields: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    console.log('In approove body middleware', req.body.payload);
    let keys: string[] = [];
    if (req.body.payload !== undefined) {
      keys = Object.keys(req.body.payload);
    } else {
      throw new BodyRequestValidationError('Invalid field(s): Empty Body, no fields in body request', 'Invalid field(s) in body request (Empty Body)');
    }
    const invalidFields = keys.filter(key => !approvedFields.includes(key));
    if (invalidFields.length === 0 && req.body.payload !== undefined) {
      next();
    } else {
      throw new BodyRequestValidationError(`Invalid field(s): ${invalidFields.join(', ')}`, 'Invalid field(s) in body request');
    };
  };
};

export default approvedBodyMiddleware;;;