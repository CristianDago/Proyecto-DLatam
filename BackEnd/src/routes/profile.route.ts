import { Router } from "express";
import { profileController } from "../controllers/profile.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

const router = Router(); 

router.use(verifyToken);

router.get("/", profileController.getProfiles);

router.post("/", profileController.createProfile);

export default router; 