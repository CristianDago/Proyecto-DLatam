import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

// Crear usuario
const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await userService.registerUser(email, password, role);
    res.json({ newUser });
  } catch (error) {
    next(error);
  }
};

// Obtener usuario por ID
const getUserByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { email, password, role } = req.body;
    const user = await userService.modifyUserById(id, email, password, role);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Borrar usuario
const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.removeUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Retornar todos los usuarios
const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
};
