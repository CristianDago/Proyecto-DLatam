import { NextFunction, Request, Response } from "express";
import { studentService } from "../services/student.service";

// Crear estudiante
const createStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentData = req.body;
    const newStudent = await studentService.createStudent(studentData);
    res.json(newStudent);
  } catch (error) {
    next(error);
  }
};

// Obtener estudiante por ID
const getStudentByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);
    res.json(student);
  } catch (error) {
    next(error);
  }
};

// Actualizar estudiante
const updateStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const studentData = req.body;
    const updatedStudent = await studentService.updateStudentById(id, {
      ...studentData,
    });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// Eliminar estudiante
const deleteStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedStudent = await studentService.deleteStudentById(id);
    res.json(deletedStudent);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los estudiantes
const getAllStudentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  createStudentHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
  getAllStudentsHandler,
};
