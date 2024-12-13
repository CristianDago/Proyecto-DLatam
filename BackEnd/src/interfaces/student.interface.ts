export enum Sex {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Source {
  QR = "código QR",
  SocialMedia = "redes sociales",
  Google = "google",
  InPerson = "captador",
}

export enum CommunicationPreference {
  Whatsapp = "whatsapp",
  Phone = "teléfono",
}

export interface CallStatus {
  completed: boolean;
  comment: string | null;
}

export interface Student {
  id: string; // UUID del estudiante
  name: string; // Nombre del estudiante (obligatorio)
  lastname: string; // Apellido del estudiante (obligatorio)
  rut?: string; // RUT del estudiante (opcional)
  sex?: Sex; // Sexo del estudiante (opcional)
  birthdate?: Date; // Fecha de nacimiento (opcional)
  nationality?: string; // Nacionalidad (opcional)
  address?: string; // Dirección (opcional)
  phone?: number; // Teléfono (opcional)
  email: string; // Correo electrónico (obligatorio)
  source?: Source; // Fuente de contacto (opcional)
  contact?: string; // Cómo se realizó el contacto (opcional)
  contactDate?: Date; // Fecha de contacto (opcional)
  call1?: CallStatus; // Estado de la llamada 1 (opcional)
  call2?: CallStatus; // Estado de la llamada 2 (opcional)
  call3?: CallStatus; // Estado de la llamada 3 (opcional)
  positiveFeedback?: boolean; // Retroalimentación positiva (opcional)
  linkDni?: string; // Enlace al DNI (opcional)
  school?: 1 | 2 | 3 | 4 | 5 | 6 | 7; // Colegio (1 a 7, opcional)
  course?: 1 | 2 | 3 | 4 | 5; // Curso (1 a 5, opcional)
  communicationPreference?: CommunicationPreference; // Preferencia de comunicación (opcional)
  createdAt?: Date; // Fecha de creación (opcional)
}
