import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { comparePassword } from '../utils/hashPass';
import { generateToken } from '../utils/jwt';


export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "email and password are required" });
		}

		const user = await userService.getByEmail(email);
		if (!user) {
			return res.status(401).json({ error: "invalid credentials" });
		}

		const isValid = await comparePassword(password, user.password);
		if (!isValid) {
			return res.status(401).json({ error: "invalid credentials" });
		}

		const token = generateToken({
			id: user.id,
			email: user.email,
		});

		return res.status(200).json({
			message: "login successful",
			token: token,
		});
	} catch (error) {
		return res.status(500).json({
			error: "internal server error",
		});
	}
};