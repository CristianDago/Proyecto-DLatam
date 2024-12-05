import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";

// Creación Login
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.loginWithEmailAndPassword(email, password);
    res.json({ token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else res.status(500).json({ error: "Error de servidor" });
  }
};

// Registro
const register = async (req: Request, res: Response) => {
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

export const authController = {
  login,
  register,
};
