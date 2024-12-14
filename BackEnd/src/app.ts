import "dotenv/config";
import express from "express";
import userRoute from "./routes/user.route";
import studentRoute from "./routes/student.route";
import authRoute from "./routes/auth.route";
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";
import rateLimit from "express-rate-limit";
import openapiSpecification from "./config/swagger";
import swaggerUi from "swagger-ui-express";

// Traer todos los métodos de express
const app = express();

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

export default app;
