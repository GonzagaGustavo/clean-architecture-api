import MissingParamError from "../../usecases/errors/missing-param";

export default class Password {
  static validate(password: string) {
    if (!password)
      return { valid: false, error: new MissingParamError("password") };

    return { valid: true, error: null };
  }
}
