import { z } from 'zod';

export const createUserData = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});



export type CreateUserData = z.infer<typeof createUserData>;