import { describe, test, expect } from "@jest/globals";
import LoginRouter from "./login-router";
import { Request } from "express";
import MissingParamError from "../../usecases/errors/missing-param";
import AuthUseCase from "../../usecases/auth";
import UnauthorizedError from "../../usecases/errors/unauthorized";

const makeSut = () => {
  const authUseCase = new AuthUseCase();
  const sut = new LoginRouter(authUseCase);
  return {
    sut,
    authUseCase,
  };
};

describe("Login Router", () => {
  test("Should return 400 if no email is provided", () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      body: {
        password: "any_password",
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "test@test.com",
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should call AuthUseCase with correct params", () => {
    const { sut, authUseCase } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "test@test.com",
        password: "any_password",
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(authUseCase.email).toBe(httpRequest.body.email);
    expect(authUseCase.password).toBe(httpRequest.body.password);
  });

  test("Should return 401 when invalid credentials are provided", () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "test@test.com",
        password: "any_password",
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });
});
