import MissingParamError from "../usecases/errors/missing-param";
import UnauthorizedError from "../usecases/errors/unauthorized";

export default class HttpResponse {
  /**
   * @returns statusCode 400
   */
  static badRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  /**
   * @returns statusCode 500
   */
  static serverError() {
    return {
      statusCode: 500,
    };
  }

  /**
   * @returns statusCode 401
   */
  static unauthorizedError() {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }
}
