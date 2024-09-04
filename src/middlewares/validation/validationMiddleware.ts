import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { matchedData } from 'express-validator';
import { RequestValidationError } from '../../errors/RequestValidationError';


const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(
        validations.map((validation) => validation.run(req))
      );
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next();
      } else {
        throw new RequestValidationError(`request parameter error => ${req.url}`, errors);
      };
      // verify data request in body, if request data optional for validation dont return data in body and extract matched data from request
      const data = matchedData(req);
    } catch (error) {
      return next(error);
    }
  };
};
export default validate;