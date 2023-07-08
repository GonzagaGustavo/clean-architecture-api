import prisma from "../../db";

export default class UserRepositorie {
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async add(email: string, name: string, password: string) {
    const user = await prisma.user.create({ data: { email, name, password } });

    return user;
  }
}
