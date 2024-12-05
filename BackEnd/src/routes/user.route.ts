import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

// Path: http://localhost:3000/api/v1/users

const router = Router();

router.use(verifyToken);

// Leer todos los usurios
router.get("/", userController.getUsers);

// Crear un usuario
router.post("/", userController.createUser);

export default router;
