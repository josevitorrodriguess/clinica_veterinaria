import { Request, Response } from "express";
import * as petService from "../services/petService";

export const createPet = async (req: Request, res: Response) => {
	try {
		const pet = await petService.createPet(req.body);
		res.status(201).json(pet);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const getPetById = async (req: Request, res: Response) => {
	try {
		const pet = await petService.getPetById(req.params.id);

		if (!pet) {
			return res.status(404).json({ error: "Pet not found" });
		}

		res.status(200).json(pet);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const getAllPets = async (req: Request, res: Response) => {
	try {
		const pets = await petService.getAllPets();
		res.status(200).json(pets);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const deletePet = async (req: Request, res: Response) => {
	try {
		const pet = await petService.deletePet(req.params.id);
		res.status(200).json(pet);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const getPetsByClientId = async (req: Request, res: Response) => {
	try {
		const pets = await petService.getPetsByClientId(req.params.clientId);
		res.status(200).json(pets);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};
