import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Profile } from "../interfaces/profile.interface";

const __dirname = import.meta.dirname;
const pathFile = path.resolve(__dirname, "../../data/profiles.json");

// Leer todos los perfiles
const readProfile = async () => {
  const profilesJSON = await readFile(pathFile, "utf-8");
  const profiles = JSON.parse(profilesJSON) as Profile[];
  return profiles;
};

// Sobrescribir perfiles
const writeProfiles = async (profiles: Profile[]) => {
  const profilesJSON = JSON.stringify(profiles, null, 2);
  return await writeFile(pathFile, profilesJSON);
};

export const ProfileModel = {
  readProfile,
  writeProfiles,
};
