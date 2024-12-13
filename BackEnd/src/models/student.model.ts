import { poolStudent } from "../config/database";
import { Student } from "../interfaces/student.interface";

// Crear un nuevo estudiante
const create = async (studentData: Student) => {
  const query = {
    text: `
      INSERT INTO students (
        name, lastname, rut, sex, birthdate, nationality, address, phone, email,
        source, contact, contactDate, call1, call2, call3, positiveFeedback,
        linkDni, school, course, communicationPreference, createdAt
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      )
      RETURNING *
    `,
    values: [
      studentData.name,
      studentData.lastname,
      studentData.rut,
      studentData.sex,
      studentData.birthdate,
      studentData.nationality,
      studentData.address,
      studentData.phone,
      studentData.email,
      studentData.source,
      studentData.contact,
      studentData.contactDate,
      JSON.stringify(studentData.call1 || { completed: false, comment: null }),
      JSON.stringify(studentData.call2 || { completed: false, comment: null }),
      JSON.stringify(studentData.call3 || { completed: false, comment: null }),
      studentData.positiveFeedback,
      studentData.linkDni,
      studentData.school,
      studentData.course,
      studentData.communicationPreference,
      studentData.createdAt || new Date().toISOString(),
    ],
  };

  const { rows } = await poolStudent.query(query);
  return rows[0] as Student;
};

// Encontrar estudiante por ID
const findById = async (id: string) => {
  const query = {
    text: "SELECT * FROM students WHERE id = $1",
    values: [id],
  };
  const { rows } = await poolStudent.query(query);
  return rows[0] as Student;
};

// Obtener un estudiante por email
const getByEmail = async (email: string) => {
  const query = {
    text: "SELECT * FROM students WHERE email = $1",
    values: [email],
  };
  const { rows } = await poolStudent.query(query);
  return rows[0] as Student;
};

// Actualizar datos de un estudiante
const update = async (id: string, studentData: Partial<Student>) => {
  const query = {
    text: `
      UPDATE students
      SET
        name = COALESCE($1, name),
        lastname = COALESCE($2, lastname),
        rut = COALESCE($3, rut),
        sex = COALESCE($4, sex),
        birthdate = COALESCE($5, birthdate),
        nationality = COALESCE($6, nationality),
        address = COALESCE($7, address),
        phone = COALESCE($8, phone),
        email = COALESCE($9, email),
        source = COALESCE($10, source),
        contact = COALESCE($11, contact),
        contactDate = COALESCE($12, contactDate),
        call1 = COALESCE($13, call1),
        call2 = COALESCE($14, call2),
        call3 = COALESCE($15, call3),
        positiveFeedback = COALESCE($16, positiveFeedback),
        linkDni = COALESCE($17, linkDni),
        school = COALESCE($18, school),
        course = COALESCE($19, course),
        communicationPreference = COALESCE($20, communicationPreference),
        createdAt = COALESCE($21, createdAt)
      WHERE id = $22
      RETURNING *
    `,
    values: [
      studentData.name,
      studentData.lastname,
      studentData.rut,
      studentData.sex,
      studentData.birthdate,
      studentData.nationality,
      studentData.address,
      studentData.phone,
      studentData.email,
      studentData.source,
      studentData.contact,
      studentData.contactDate,
      JSON.stringify(studentData.call1 || { completed: false, comment: null }),
      JSON.stringify(studentData.call2 || { completed: false, comment: null }),
      JSON.stringify(studentData.call3 || { completed: false, comment: null }),
      studentData.positiveFeedback,
      studentData.linkDni,
      studentData.school,
      studentData.course,
      studentData.communicationPreference,
      studentData.createdAt,
      id,
    ],
  };

  const { rows } = await poolStudent.query(query);
  return rows[0] as Student;
};

// Eliminar un estudiante
const remove = async (id: string) => {
  const query = {
    text: "DELETE FROM students WHERE id = $1 RETURNING *",
    values: [id],
  };
  const { rows } = await poolStudent.query(query);
  return rows[0] as Student;
};

// Obtener todos los estudiantes
const getAll = async () => {
  const query = {
    text: "SELECT * FROM students",
  };
  const { rows } = await poolStudent.query(query);
  return rows as Student[];
};

export const StudentModel = {
  create,
  findById,
  getByEmail,
  update,
  remove,
  getAll,
};
