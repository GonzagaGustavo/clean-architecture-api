import { describe, test, expect } from "@jest/globals";
import LoginRouter from "./login-router";
import { Request } from "express";
import MissingParamError from "../../usecases/errors/missing-param";
import AuthUseCase from "../../usecases/auth";
import UnauthorizedError from "../../usecases/errors/unauthorized";
import InvalidParamError from "../../usecases/errors/invalid-param";

const makeSut = () => {
  const authUseCase = new AuthUseCase();
  const sut = new LoginRouter(authUseCase);
  return {
    sut,
    authUseCase,
  };
};

describe("Login Router", () => {
  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      body: {
        password: "any_password",
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "test@mail.com",
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if an invalid email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "invalid_mail.com",
        password: "any_password",
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call AuthUseCase with correct params", () => {
    const { sut, authUseCase } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "test@mail.com",
        password: "any_password",
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(authUseCase.email).toBe(httpRequest.body.email);
    expect(authUseCase.password).toBe(httpRequest.body.password);
  });

  test("Should return 401 when invalid credentials are provided", async () => {
    const { sut, authUseCase } = makeSut();
    authUseCase.accessToken = null;
    const httpRequest: Request = {
      body: {
        email: "invalid@main.com",
        password: "invalid_password",
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });

  test("Should return 200 when valid credentials are provided", async () => {
    const { sut, authUseCase } = makeSut();
    const httpRequest: Request = {
      body: {
        email: "test@mail.com",
        password: "any_password",
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ accessToken: authUseCase.accessToken });
  });
});
