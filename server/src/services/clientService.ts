import { PrismaClient } from "../generated/prisma";
import { CreateClientData } from "../schema/clientSchema";

const prisma = new PrismaClient();

export async function createClient(data: CreateClientData) {
  return prisma.client.create({ data });
}


export async function getAllClients() {
  return prisma.client.findMany({
    orderBy: { name: "asc" },
  });
}


export async function getClientById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      pets: true,
    },
  });
}

export async function deleteClient(id: string) {
  return prisma.client.delete({ where: { id } });
}
