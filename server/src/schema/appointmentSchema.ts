import { z } from "zod";

export const createAppointmentData = z.object({
  date: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date format"),
  reason: z.string().min(1, "Reason is required"),
  clientId: z.string().uuid("Invalid client ID"),
  petId: z.string().uuid("Invalid pet ID"),
  userId: z.string().uuid("Invalid user ID").optional(),
});

export type CreateAppointmentData = z.infer<typeof createAppointmentData>;
