import { CustomError } from "../utils/errors/CustomError.js";

export class AuthError401 extends CustomError {
  statusCode = 401;
  reason = 'Invalid login credentials';
  constructor(ErrorDetail: string) {
    super('Auth Error', ErrorDetail);
    Object.setPrototypeOf(this, AuthError401.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}