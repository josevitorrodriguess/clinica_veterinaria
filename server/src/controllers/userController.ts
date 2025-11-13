import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	}
	catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};


export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await userService.getUserById(req.params.id);
		if (user) {
			res.status(200).json(user);

		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });

	}
};


export const getByEmail = async (req: Request, res: Response) => {
	try {
		const user = await userService.getByEmail(req.params.email);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};



export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	}
	catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};


export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.deleteUser(req.params.id);
		res.status(200).json(user);
	}
	catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};