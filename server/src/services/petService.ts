import { PrismaClient, Pet } from "../generated/prisma";
import { CreatePetData } from "../schema/petSchema";

const prisma = new PrismaClient();

export async function createPet(data: CreatePetData): Promise<Pet> {
  const { name, species, breed, age, clientId } = data;

  return prisma.pet.create({
    data: {
      name,
      species,
      breed,
      age,
      clientId,
    },
  });
}

export async function getPetById(id: string): Promise<Pet | null> {
  return prisma.pet.findUnique({
    where: { id },
  });
}

export async function getAllPets(): Promise<Pet[]> {
  return prisma.pet.findMany();
}

export async function deletePet(id: string): Promise<Pet> {
  return prisma.pet.delete({
    where: { id },
  });
}

export async function getPetsByClientId(clientId: string): Promise<Pet[]> {
  return prisma.pet.findMany({
    where: { clientId },
  });
}
