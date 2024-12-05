import express from "express";
import userRoute from "./routes/user.route";
import profileRoute from "./routes/profile.route"
import authRoute from './routes/auth.route'

// Traer todos los métodos de express
const app = express();

// Configuración de puerto
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute); 

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor encendido puerto ${port}`);
});
