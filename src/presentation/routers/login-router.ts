import { Request } from "express";
import HttpResponse from "../../shared/response";
import AuthUseCase from "../../usecases/auth";

export default class LoginRouter {
  authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  route(httpRequest: Request) {
    const { email, password } = httpRequest.body;

    if (!email) {
      return HttpResponse.badRequest("email");
    } else if (!password) {
      return HttpResponse.badRequest("password");
    }

    this.authUseCase.auth(email, password);
    return HttpResponse.unauthorizedError();
  }
}
