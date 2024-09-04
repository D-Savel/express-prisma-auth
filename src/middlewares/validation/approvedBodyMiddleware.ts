import { Request, Response, NextFunction } from 'express';
import BodyRequestValidationError from '../../errors/BodyRequestValidationError';

const approvedBodyMiddleware = (approvedFields: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(req.body.payload);
    const invalidFields = keys.filter(key => !approvedFields.includes(key));

    if (invalidFields.length === 0) {
      next();
    } else {
      throw new BodyRequestValidationError(`Invalid field(s): ${invalidFields.join(', ')}`);
    };
  };
};

export default approvedBodyMiddleware;