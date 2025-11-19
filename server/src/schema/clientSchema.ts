import { z } from "zod";

export const createClientData = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().optional(),
});

export type CreateClientData = z.infer<typeof createClientData>;
