import bcryptjs from "bcryptjs";
import { userService } from "./user.service";
import { allowedRoles } from "../interfaces/user.interface";
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/httpError.util";

const authenticateUser = async (email: string, password: string) => {
  const user = await userService.findUserByEmail(email);

  // Verificar que existe el usuario
  if (!user) {
    throw new HttpError("El email no está registrado", 404);
  }

  // Comparar los hash de contraseña
  const isValidPassword = await bcryptjs.compare(password, user.password);
  if (!isValidPassword) {
    throw new HttpError("La contraseña es incorrecta", 401);
  }

  // Generar Token
  const token = generateAccessToken(user.email, user.id, user.role);
  return token;
};

const createUserAccount = async (
  email: string,
  password: string,
  role: allowedRoles
) => {
  const newUser = await userService.registerUser(email, password, role);

  // Generar Token
  const token = generateAccessToken(newUser.email, newUser.id, newUser.role);
  return token;
};

export const authService = {
  authenticateUser,
  createUserAccount,
};
