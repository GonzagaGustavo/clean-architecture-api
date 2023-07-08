export default class AuthUseCase {
  email: string;
  password: string;
  accessToken: string | null = "valid_token";

  async auth(email: string, password: string) {
    this.email = email;
    this.password = password;
    return this.accessToken;
  }
}
