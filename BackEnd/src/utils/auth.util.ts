import jwt from "jsonwebtoken";

// Usa el valor de JWT_SECRET del entorno, o un valor predeterminado
const secret = process.env.JWT_SECRET || "secret";

export const generateAccessToken = (
  email: string,
  uid: string,
  role: string,
  expiresIn = "1h" // Por defecto, 1 hora
) => {
  console.log("expiresIn:", expiresIn);
  return jwt.sign({ email, uid, role }, secret, {
    expiresIn, // Asegúrate de que expiresIn sea una cadena como "1h" o un número
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, secret) as jwt.JwtPayload; // Usa `secret` en lugar de "secret"
};
