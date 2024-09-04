import { CustomError } from "../utils/errors/CustomError";

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Error route not found';

  constructor(ErrorDetail: string) {
    super('Route not found', ErrorDetail);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}