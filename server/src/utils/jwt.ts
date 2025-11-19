import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret-dev";

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
