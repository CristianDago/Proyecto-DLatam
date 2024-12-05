import { ProfileModel } from "../models/profile.model";
import { Profile } from "../interfaces/profile.interface";
import { nanoid } from "nanoid";


const getAllProfiles = async () => {
  const profiles = await  ProfileModel.readProfile();
  return profiles;
};

const createProfile = async (profileData: Omit<Profile, "id" | "createdAt">): Promise<Profile> => {
  try {
    // Leer perfiles existentes
    const profiles = await ProfileModel.readProfile();
    // Crear el nuevo perfil con un ID único y fecha de creación
    const newProfile: Profile = {
      id: nanoid(),
      createdAt: new Date(),
      ...profileData,
    };
    // Agregar el nuevo perfil al array
    profiles.push(newProfile);
    // Guardar los perfiles actualizados en el archivo
    await ProfileModel.writeProfiles(profiles);
    // Retornar el perfil creado
    return newProfile;
  } catch (error) {
    throw new Error("Error al crear el perfil:");
  }
};

export const profileService = {
  getAllProfiles,
  createProfile
};
