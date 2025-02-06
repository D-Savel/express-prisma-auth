import { CustomError } from "../utils/errors/CustomError.js";

export class AuthError403 extends CustomError {
  statusCode = 403;
  reason = 'Invalid login credentials';
  constructor(ErrorDetail: string) {
    super('Auth Error', ErrorDetail);
    Object.setPrototypeOf(this, AuthError403.prototype);
  }
  formatErrors() {
    return [{ message: this.reason }];
  }
}