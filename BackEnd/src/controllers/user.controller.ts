import { Request, Response } from "express";
import { userService } from "../services/user.service";

// Mostrar Usuarios
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else res.status(500).json({ error: "Error de servidor" });
  }
};

// Crear Usuarios
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await userService.createUserWithEmailAndPassword(
      email,
      password,
      role
    );
    res.json({ newUser });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else res.status(500).json({ error: "Error de servidor" });
  }
};

export const userController = {
  getUsers,
  createUser,
};
