import pg from "pg";

const { Pool } = pg;

const connectionStringUser = process.env.CONNECT_DG_USERS;
export const poolUser = new Pool({
  connectionString: connectionStringUser,
  allowExitOnIdle: true,
});

// Conexión a la segunda base de datos
const connectionStringStudent = process.env.CONNECT_DG_PROFILES;
export const poolStudent = new Pool({
  connectionString: connectionStringStudent,
  allowExitOnIdle: true,
});
