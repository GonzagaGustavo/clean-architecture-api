export default class AuthUseCase {
  email: string;
  password: string;

  auth(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
