import { PrismaClient } from "../generated/prisma";
import { CreateAppointmentData } from "../schema/appointmentSchema";

const prisma = new PrismaClient();

export async function createAppointment(data: CreateAppointmentData) {
	return prisma.appointment.create({
		data: {
			date: new Date(data.date),
			reason: data.reason,
			userId: data.userId,
			clientId: data.clientId,
			petId: data.petId,
		},
	});
}

export async function getAllAppointments(userId: string) {
	return prisma.appointment.findMany({
		where: { userId },
		orderBy: { date: "asc" },
		include: {
			client: { select: { id: true, name: true } },
			pet: { select: { id: true, name: true } }
		},
	});
}

// DETALHES - dados completos
export async function getAppointmentById(id: string) {
	return prisma.appointment.findUnique({
		where: { id },
		include: {
			user: { select: { id: true, name: true, email: true } },
			client: { select: { id: true, name: true, email: true, phone: true } },
			pet: { select: { id: true, name: true, species: true, breed: true, age: true } }
		},
	});
}

export async function deleteAppointment(id: string) {
	return prisma.appointment.delete({ where: { id } });
}
