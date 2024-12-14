import "dotenv/config";
import { poolUser, poolStudent } from "./config/database";
import app from "./app";

// Configuración de puerto
const port = process.env.PORT || 3000;

const main = async () => {
  try {
    const { rows } = await poolUser.query("SELECT NOW()");
    console.log("Base de datos userdb conectada:", rows);
  } catch (error) {
    console.error("Error conectando a userdb:", error);
  }

  try {
    const { rows } = await poolStudent.query("SELECT NOW()");
    console.log("Base de datos profiledb conectada:", rows);
  } catch (error) {
    console.error("Error conectando a studentdb:", error);
  }

  app.listen(port, () => {
    console.log(`Servidor encendido en puerto ${port}`);
  });
};

main();
