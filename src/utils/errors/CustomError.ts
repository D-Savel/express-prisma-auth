export abstract class CustomError extends Error {
  abstract statusCode: number;
  errorDetail: string
  constructor(message: string, errorDetail: string) {
    super(message);
    this.errorDetail = errorDetail
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract formatErrors(): {
    message: string,
    field?: string
  }[];
}