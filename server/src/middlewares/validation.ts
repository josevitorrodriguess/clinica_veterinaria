import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

const formatZodError = (error: ZodError) => ({
	message: "Dados inválidos",
	errors: error.issues.map(issue => ({
		campo: issue.path.join("."),
		mensagem: issue.message,
	})),
});


export const validateBody = (schema: z.ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const parsed = schema.parse(req.body);
			req.body = parsed;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json(formatZodError(error));
			}
			return next(error);
		}
	};
};


export const validateParams = (schema: z.ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const parsed = schema.parse(req.params);
			(req as any).validatedParams = parsed; // ← seguro
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json(formatZodError(error));
			}
			return next(error);
		}
	};
};


export const validateQuery = (schema: z.ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const parsed = schema.parse(req.query);
			(req as any).validatedQuery = parsed; // ← seguro
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json(formatZodError(error));
			}
			return next(error);
		}
	};
};
