import { PrismaClient, User } from "../generated/prisma";
import { CreateUserData } from "../schema/userSchema";

export class UserService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async createUser(user: CreateUserData): Promise<User> {
		const { name, email, password } = user;

		return this.prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});
	}

	async getUserById(userId: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id: userId },
		});
	}

	async getByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	async getAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async deleteUser(userId: string): Promise<User> {
		return this.prisma.user.delete({
			where: { id: userId },
		});
	}
}
