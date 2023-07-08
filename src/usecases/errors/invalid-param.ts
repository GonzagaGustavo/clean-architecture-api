export default class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid params: ${paramName}`);
    this.name = "InvalidParamError";
  }
}
