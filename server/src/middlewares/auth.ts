import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret-dev";

export interface AuthRequest extends Request {
	user?: any;
}

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ error: "Token not provided" });
		}

		const [, token] = authHeader.split(" "); // "Bearer token"

		if (!token) {
			return res.status(401).json({ error: "Invalid token format" });
		}

		const decoded = jwt.verify(token, SECRET);
		req.user = decoded;

		return next();
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Token expired" });
		}

		if (err.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid token" });
		}

		return res.status(500).json({ error: "Authentication failed" });
	}
};
