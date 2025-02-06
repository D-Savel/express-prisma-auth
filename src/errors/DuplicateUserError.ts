
import capitalizeFirstLetter from "../utils/common/capitalizeFirstLetter.js";
import { CustomError } from "../utils/errors/CustomError.js";

export class DuplicateRecordError extends CustomError {
  statusCode = 409;
  reason = 'Error fetching data to database';
  constructor(ErrorDetail: string, entity: string) {
    super(`Duplicate record values(s) for ${capitalizeFirstLetter(entity)} field(s)`, ErrorDetail);
    Object.setPrototypeOf(this, DuplicateRecordError.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}