
import { CustomError } from "../utils/errors/CustomError.js";

export class DatabaseError extends CustomError {
  statusCode = 422;
  reason = 'Error fetching data to database';
  constructor(ErrorDetail: string) {
    super('Database Error', ErrorDetail);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}