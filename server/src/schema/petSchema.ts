import { z } from "zod";

export const createPetData = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  breed: z.string().optional(),
  age: z.number().int().nonnegative().optional(),
  clientId: z.string().uuid("Invalid client ID"),
});

export type CreatePetData = z.infer<typeof createPetData>;
