import { StudentModel } from "../models/student.model";
import { Student } from "../interfaces/student.interface";
import { HttpError } from "../utils/httpError.util";

// Crear un nuevo estudiante
const createStudent = async (
  studentData: Student
): Promise<Omit<Student, "id">> => {
  const { email, phone, name, lastname } = studentData;

  // Función para validar campos obligatorios
  const validateField = (field: any, fieldName: string): void => {
    if (!field) {
      throw new HttpError(`${fieldName} es obligatorio`, 400);
    }
  };

  // Validar los campos
  validateField(name, "El nombre");
  validateField(lastname, "El apellido");
  validateField(email, "El email");
  validateField(phone, "El número de teléfono");

  // Verificar si el estudiante ya existe
  const existingStudent = await StudentModel.getByEmail(email);
  if (existingStudent) {
    throw new HttpError("El email ya está registrado", 409);
  }

  // Añadir la fecha de creación al studentData
  const newStudentData: Student = { ...studentData, createdAt: new Date() };

  // Crear el estudiante en la base de datos
  const newStudent = await StudentModel.create(newStudentData);

  // Eliminar el campo 'id' antes de devolver
  const { id, ...studentWithoutId } = newStudent;

  return studentWithoutId; // Devolver el estudiante sin el campo 'id'
};

// Obtener estudiante por ID
const getStudentById = async (id: string): Promise<Omit<Student, "id">> => {
  const student = await StudentModel.findById(id);
  if (!student) throw new HttpError("El ID de estudiante no es válido", 404);

  // Eliminar el campo 'id' antes de devolver
  const { id: studentId, ...studentWithoutId } = student;

  return studentWithoutId; // Devolver el estudiante sin el campo 'id'
};

// Obtener estudiante por email
const getStudentByEmail = async (email: string): Promise<Student> => {
  const student = await StudentModel.getByEmail(email);
  if (!student) throw new HttpError("El email no se encuentra registrado", 404);
  return student;
};

// Eliminar estudiante por ID
const deleteStudentById = async (id: string): Promise<Student> => {
  const student = await StudentModel.remove(id);
  if (!student)
    throw new HttpError("No se encontró el estudiante para eliminar", 404);
  return student;
};

// Actualizar estudiante por ID
const updateStudentById = async (
  id: string,
  studentData: Partial<Student>
): Promise<Omit<Student, "id">> => {
  // Verificar si se está intentando modificar el email
  if (studentData.email) {
    // Verificar si el nuevo email ya está registrado (excluyendo el estudiante actual)
    const existingStudent = await StudentModel.getByEmail(studentData.email);
    if (existingStudent && existingStudent.id !== id) {
      throw new HttpError(
        "El email ya está registrado por otro estudiante",
        400
      );
    }
  }

  // Actualizar el estudiante
  const updatedStudent = await StudentModel.update(id, studentData);
  if (!updatedStudent) {
    throw new HttpError(
      "No se pudo actualizar el estudiante: ID inválido",
      400
    );
  }

  // Eliminar el campo 'id' antes de devolver
  const { id: studentId, ...studentWithoutId } = updatedStudent;

  return studentWithoutId; // Devolver el estudiante actualizado sin el campo 'id'
};

// Obtener todos los estudiantes
const getAllStudents = async (): Promise<
  { name: string; lastname: string }[]
> => {
  const students = await StudentModel.getAll();
  if (!students.length) {
    throw new HttpError("No se encontraron estudiantes registrados", 404);
  }
  // Filtrar solo el campo 'name' de cada estudiante
  const studentsNames = students.map((student) => {
    return { name: student.name, lastname: student.lastname }; // Solo retornamos el nombre
  });

  return studentsNames;
};

export const studentService = {
  createStudent,
  getStudentById,
  getStudentByEmail,
  deleteStudentById,
  updateStudentById,
  getAllStudents,
};
