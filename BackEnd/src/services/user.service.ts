import { UserModel } from "../models/user.model";
import { nanoid } from "nanoid";
import { allowedRoles } from "../interfaces/user.interface";
import bcryptjs from "bcryptjs";

const allowedRolesArray: allowedRoles[] = ["admin", "user", "moderator"];

const getAllUsers = async () => {
  const users = await UserModel.readUsers();
  return users;
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  role: allowedRoles
) => {
  if (!allowedRolesArray.includes(role)) {
    throw new Error(
      `El rol '${role}' no es válido. Los roles permitidos son: ${allowedRolesArray.join(
        ", "
      )}`
    );
  }

  const users = await getAllUsers();
  const user = users.find((item) => item.email === email);
  if (user) {
    throw new Error("Este email no se encuentra disponible");
  }

  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);

  const newUser = {
    id: nanoid(),
    email,
    password: passwordHashed,
    role,
  };

  users.push(newUser);
  await UserModel.writeUser(users);
  return newUser;
};

export const userService = {
  getAllUsers,
  createUserWithEmailAndPassword,
};
