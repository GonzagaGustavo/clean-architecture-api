import UnauthorizedError from "../usecases/errors/unauthorized";

export default class HttpResponse {
  /**
   * @returns statusCode 400
   */
  static badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error,
    };
  }

  /**
   * @returns statusCode 500
   */
  static serverError(error: any) {
    return {
      statusCode: 500,
      body: error,
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

  /**
   * @returns statusCode 200
   */
  static ok(body: any) {
    return {
      statusCode: 200,
      body: body,
    };
  }
}
