export default class ApiError extends Error {
  constructor(errorCode, reason, data = null) {
    super(reason);
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;
  }
}
