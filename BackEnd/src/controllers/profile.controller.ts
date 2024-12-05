import { Request, Response } from "express";
import { profileService } from "../services/profile.service";

// Mostrar Perfiles
const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else res.status(500).json({ error: "Error de servidor" });
  }
};

// Crear Perfiles
const createProfile = async (req: Request, res: Response) => {
  try {
    // Obtener datos del perfil desde el cuerpo de la solicitud
    const profileData = req.body;
    // Llamar al servicio para crear el perfil
    const newProfile = await profileService.createProfile(profileData);
    // Enviar respuesta con el perfil creado
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error de servidor" });
    }
  }
};

export const profileController = {
  getProfiles,
  createProfile,
};
