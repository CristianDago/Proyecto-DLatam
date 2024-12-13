import { poolUser } from "../config/database";
import { User } from "../interfaces/user.interface";

// Crear usuario en la BASE DE DATOS
const create = async (email: string, password: string, role: string) => {
  const query = {
    text: `
    INSERT INTO USERS (email, password, role)
    VALUES ($1, $2, $3)
    RETURNING*
    `,
    values: [email, password, role],
  };
  const { rows } = await poolUser.query(query);
  return rows[0] as User;
};

// Encuentra usuario en la base de datos por ID
const findById = async (id: string) => {
  const query = {
    text: "SELECT * FROM users WHERE id = $1",
    values: [id],
  };
  const { rows } = await poolUser.query(query);
  return rows[0] as User;
};

// Encuentra usuario en la base de datos por EMAIL
const findOneByEmail = async (email: string) => {
  const query = {
    text: `
    SELECT * FROM USERS
    WHERE email = $1 
    `,
    values: [email],
  };
  const { rows } = await poolUser.query(query);
  return rows[0] as User;
};

// Actualizar datos de usuario
const update = async (
  id: string,
  email: string,
  password: string,
  role: string
) => {
  const query = {
    text: `
      UPDATE users 
      SET email = $1, password = $2, role = $3 
      WHERE id = $4 
      RETURNING *
    `,
    values: [email, password, role, id],
  };
  const { rows } = await poolUser.query(query);
  return rows[0] as User;
};

// Eliminar usuario
const remove = async (id: string) => {
  const query = {
    text: "DELETE FROM users WHERE id = $1 RETURNING *",
    values: [id],
  };
  console.log(query);
  const { rows } = await poolUser.query(query);
  return rows[0] as User;
};

// Retorna todos los usuarios
const getAll = async () => {
  const query = {
    text: "SELECT * FROM USERS",
  };
  const { rows } = await poolUser.query(query);
  return rows as User[];
};

export const UserModel = {
  create,
  findById,
  findOneByEmail,
  update,
  remove,
  getAll,
};
