import { Request } from "express";
import HttpResponse from "../../shared/response";
import AuthUseCase from "../../usecases/auth";
import Email from "../../entities/user/email-validator";
import Password from "../../entities/user/password-validator";

export default class LoginRouter {
  authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  async route(httpRequest: Request) {
    try {
      const { email, password } = httpRequest.body;
      const validatedEmail = Email.validate(email);
      const validatedPassword = Password.validate(password);

      if (!validatedEmail.valid) {
        return HttpResponse.badRequest(validatedEmail.error);
      }
      if (!validatedPassword.valid) {
        return HttpResponse.badRequest(validatedPassword.error);
      }

      const accessToken = await this.authUseCase.auth(email, password);

      if (!accessToken) return HttpResponse.unauthorizedError();

      return HttpResponse.ok({ accessToken });
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError(error);
    }
  }
}
