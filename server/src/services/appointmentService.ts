import { PrismaClient } from "../generated/prisma";
import { CreateAppointmentData } from "../schema/appointmentSchema";

const prisma = new PrismaClient();

export async function createAppointment(data: CreateAppointmentData) {
  const { date, userId, ...rest } = data;

  if (!userId) {
    throw new Error("User is required");
  }

  return prisma.appointment.create({
    data: {
      ...rest,
      userId,
      date: new Date(date),
    },
    include: {
      user: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      pet: { select: { id: true, name: true } },
    },
  });
}

export async function getAllAppointments() {
  return prisma.appointment.findMany({
    include: {
      user: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      pet: { select: { id: true, name: true } },
    },
    orderBy: { date: "asc" },
  });
}

export async function getAppointmentById(id: string) {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      pet: { select: { id: true, name: true } },
    },
  });
}

export async function deleteAppointment(id: string) {
  return prisma.appointment.delete({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      pet: { select: { id: true, name: true } },
    },
  });
}
