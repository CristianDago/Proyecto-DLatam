import { UserModel } from "../models/user.model";
import { allowedRoles } from "../interfaces/user.interface";
import { HttpError } from "../utils/httpError.util";
import bcryptjs from "bcryptjs";

const allowedRolesArray: allowedRoles[] = [
  "admin",
  "catcher",
  "editor",
  "visit",
];

// Crear usuario por email y contraseña
const registerUser = async (
  email: string,
  password: string,
  role: allowedRoles
) => {
  const user = await UserModel.findOneByEmail(email);

  if (!allowedRolesArray.includes(role)) {
    throw new HttpError("El rol no es válido.", 403);
  }
  if (user) {
    throw new HttpError("El email ya está registrado", 409);
  }
  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);

  const newUser = await UserModel.create(email, passwordHashed, role);

  return newUser;
};

// Retorna usuario por ID
const findUserById = async (id: string) => {
  // Buscar el usuario por su ID
  const user = await UserModel.findById(id);
  if (!user) throw new HttpError("El ID de usuario no es válido", 404);

  // Filtrar el campo `id` antes de devolver el usuario
  const { id: __, ...sanitizedUser } = user;

  // Devolver el usuario sin el campo `id`
  return sanitizedUser;
};

// Retorna usuario por email
const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOneByEmail(email);
  if (!user) throw new HttpError("El email no se encuentra registrado", 404);
  return user;
};

// Actualiza usuario por ID
const modifyUserById = async (
  id: string,
  email: string,
  password: string,
  role: string
) => {
  if (!allowedRolesArray.includes(role as allowedRoles)) {
    throw new HttpError("El rol no es válido.", 403);
  }

  const user = await UserModel.update(id, email, password, role);
  if (!user)
    throw new HttpError("No se pudo actualizar el usuario: ID inválido", 400);

  // Filtrar campos sensibles
  const { password: _, id: __, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Borra usuario por ID
const removeUserById = async (id: string) => {
  const user = await UserModel.remove(id);
  if (!user)
    throw new HttpError("No se encontró el usuario para eliminar", 404);
  return user;
};

// Retorna todos los usuarios
const listAllUsers = async () => {
  try {
    const users = await UserModel.getAll();
    if (!users.length) {
      throw new HttpError("No se encontraron usuarios registrados", 404);
    }

    // Filtrar campos sensibles
    const sanitizedUsers = users.map(({ id, password, ...rest }) => rest);
    return sanitizedUsers;
  } catch (error) {
    throw new HttpError("Error al cargar usuarios", 500);
  }
};

export const userService = {
  registerUser,
  findUserById,
  findUserByEmail,
  removeUserById,
  modifyUserById,
  listAllUsers,
};
