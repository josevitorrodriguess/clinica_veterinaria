import { PrismaClient, User } from "../generated/prisma";
import { CreateUserData } from "../schema/userSchema";

const prisma = new PrismaClient();

export async function createUser(user: CreateUserData): Promise<User> {
  const { name, email, password } = user;
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function getUserById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function getByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email },
  });
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function deleteUser(userId: string): Promise<User> {
  return prisma.user.delete({
    where: { id: userId },
  });
}
