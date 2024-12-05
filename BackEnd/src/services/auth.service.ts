import { userService } from "./user.service";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const users = await userService.getAllUsers();

  // 1.- Verificar que exite el usuario
  const user = users.find((item) => item.email === email);
  if (!user) {
    throw new Error("El Usuario no existe");
  }
  // 2.- Comprar los hash de contraseña
  const isValidPassword = await bcryptjs.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Contraseña Incorrecta");
  }

  // 3.- Generar Token
  const token = jwt.sign({ email: user.email, role: user.role }, "secret", {
    expiresIn: "1h",
  });
  return token;
};

export const authService = {
  loginWithEmailAndPassword,
};
