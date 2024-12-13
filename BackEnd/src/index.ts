import "dotenv/config";

import express from "express";
import userRoute from "./routes/user.route";
import studentRoute from "./routes/student.route";
import authRoute from "./routes/auth.route";
import { poolUser, poolStudent } from "./config/database";
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";
import rateLimit from "express-rate-limit";

import openapiSpecification from "./config/swagger";
import swaggerUi from "swagger-ui-express";

// Traer todos los métodos de express
const app = express();

// Configuración de puerto
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());

// Configurar el limitador
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
  standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
  legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});

// Aplicar el limitador globalmente
app.use(limiter);

// Rutas
app.use("/users", userRoute);
app.use("/students", studentRoute);
app.use("/auth", authRoute);

app.use(httpErrorHandle);
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
