export default class ApiError extends Error {
  status;
  validation;

  constructor(status, message, validation = null) {
    super(message);

    this.status = status;
    this.validation = validation && JSON.parse(validation);
  }
}
