import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth.util";

// Extender o modificar el comportamiento de un módulo ya existente.
declare module "express-serve-static-core" {
  interface Request {
    email?: string;
    uid?: string;
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "No se proporcionó un token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.email = payload.email;
    req.uid = payload.uid;
    console.log(payload);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token inválido" });
  }
};
