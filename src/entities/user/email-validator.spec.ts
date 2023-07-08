import { describe, expect, test } from "@jest/globals";
import Email from "./email-validator";

describe("Email Validator", () => {
  test("Should accept valid email (valid classes)", () => {
    expect(Email.validate("gustavogonzaga.gg243@gmail.com").valid).toBe(true);
  });

  test("Should not accept email without the at-sign (@)", () => {
    expect(Email.validate("gustavogonzaga.com").valid).toBe(false);
  });

  test("Should not accept more than 64 chars on local part", () => {
    var localPart = "c".repeat(100);
    const email = localPart + "@gmail.com";
    expect(Email.validate(email).valid).toBe(false);
  });

  test("Should not accept more than 255 chars on domain part", () => {
    const domain = "c".repeat(260);
    const email = "otaviolemos@" + domain + ".com";
    expect(Email.validate(email).valid).toBe(false);
  });

  test("Should not accept empty local part", () => {
    expect(Email.validate("@gmail.com").valid).toBe(false);
  });

  test("Should not accept invalid char - local part", () => {
    expect(Email.validate("ot violemos@gmail.com").valid).toBe(false);
  });
});
