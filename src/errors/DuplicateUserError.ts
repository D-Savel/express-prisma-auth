
import { CustomError } from "../utils/errors/CustomError.js";

export class DuplicateUserError extends CustomError {
  statusCode = 400;
  reason = 'Error fetching data to database';
  constructor(ErrorDetail: string) {
    super('Duplicate User', ErrorDetail);
    Object.setPrototypeOf(this, DuplicateUserError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}