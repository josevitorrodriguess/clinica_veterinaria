import { Request, Response } from "express";
import * as userService from "../services/userService";
import { comparePassword } from "../utils/hashPass";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and password are required" });
		}

		const user = await userService.getByEmail(email);

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const ok = await comparePassword(password, user.password);

		if (!ok) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = generateToken({
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
		});

		return res.status(200).json({
			message: "Login successful",
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};
