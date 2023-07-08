import InvalidParamError from "../../usecases/errors/invalid-param";
import MissingParamError from "../../usecases/errors/missing-param";

export default class Email {
  static validate(email: string): { valid: boolean; error: Error | null } {
    const tester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return { valid: false, error: new MissingParamError("email") };
    if (email.length > 256)
      return { valid: false, error: new InvalidParamError("email") };
    if (!tester.test(email))
      return { valid: false, error: new InvalidParamError("email") };

    const [account, address] = email.split("@");
    if (account.length > 64)
      return { valid: false, error: new InvalidParamError("email") };
    const domainParts = address.split(".");
    if (domainParts.some((part) => part.length > 63))
      return { valid: false, error: new InvalidParamError("email") };

    return { valid: true, error: null };
  }
}
