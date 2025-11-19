import { PrismaClient } from "../generated/prisma";
import { CreatePetData } from "../schema/petSchema";

const prisma = new PrismaClient();

export async function createPet(data: CreatePetData) {
  return prisma.pet.create({ data });
}


export async function getAllPets() {
  return prisma.pet.findMany({
    include: {
      client: { select: { id: true, name: true } }
    }
  });
}


export async function getPetById(id: string) {
  return prisma.pet.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, phone: true } },
      appointments: {
        select: {
          id: true,
          date: true,
          reason: true,
        },
        orderBy: { date: "desc" }
      }
    }
  });
}

export async function deletePet(id: string) {
  return prisma.pet.delete({ where: { id } });
}
