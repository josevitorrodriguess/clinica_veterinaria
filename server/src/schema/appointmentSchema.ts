import { z } from "zod";

export const createAppointmentData = z.object({
  date: z.string().datetime("Invalid date format"), // ISO string
  reason: z.string().min(1, "Reason is required"),
  userId: z.string().uuid("Invalid user ID"),
  clientId: z.string().uuid("Invalid client ID"),
  petId: z.string().uuid("Invalid pet ID"),
});

export type CreateAppointmentData = z.infer<typeof createAppointmentData>;
