export type allowedRoles = "admin" | "user" | "moderator";

export interface User {
  id: string;
  email: string;
  password: string;
  role: allowedRoles;
}
