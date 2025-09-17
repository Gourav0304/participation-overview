import { prisma } from '@/lib/prisma';

export class UserService {
  static async createUser(firstName: string, lastName: string, participationPercentage: number) {
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        participationPercentage,
      },
    });
  }

  static async getUsers() {
    return await prisma.user.findMany();
  }

  static async getUserById(id: number) {
    return  await prisma.user.findUnique({
      where: { id },
    });
  }
}
