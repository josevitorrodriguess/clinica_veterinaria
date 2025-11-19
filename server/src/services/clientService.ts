import { PrismaClient, Client } from "../generated/prisma";
import { CreateClientData } from "../schema/clientSchema";

const prisma = new PrismaClient();

export async function createClient(data: CreateClientData): Promise<Client> {
  const { name, email, phone } = data;

  return prisma.client.create({
    data: { name, email, phone },
  });
}

export async function getClientById(clientId: string): Promise<Client | null> {
  return prisma.client.findUnique({
    where: { id: clientId },
  });
}

export async function getClientByEmail(email: string): Promise<Client | null> {
  return prisma.client.findUnique({
    where: { email },
  });
}

export async function getAllClients(): Promise<Client[]> {
  return prisma.client.findMany();
}

export async function deleteClient(clientId: string): Promise<Client> {
  return prisma.client.delete({
    where: { id: clientId },
  });
}
