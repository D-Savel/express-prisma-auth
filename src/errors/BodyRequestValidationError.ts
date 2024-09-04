import { CustomError } from '../utils/errors/CustomError';

export class BodyRequestValidationError extends CustomError {
  statusCode = 400;
  reason = 'Bad Request :body fields validation Error';

  constructor(errorDetail: string, public errors?: any) {
    super('Invalid request body parameter(s)', errorDetail);
    Object.setPrototypeOf(this, BodyRequestValidationError.prototype);
  };

  formatErrors() {
    return this.errors;
  }
}

export default BodyRequestValidationError;
