import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

const router = Router();

router.post("/login", authController.login); 
router.post("/register", verifyToken, authController.register);

export default router;
