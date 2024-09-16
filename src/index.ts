import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import eventRoutes from './routes/routes';
import { initializeDatabase } from './typeorm-config';
import { configureExcelRoutes } from './routes/excel.routes'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', eventRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicializar la base de datos y luego configurar las rutas
initializeDatabase()
  .then(async () => {
    // Configura las rutas de Excel después de la conexión
    const excelRoutes = await configureExcelRoutes();
    app.use('/api/v1/excel', excelRoutes);

    // Inicia el servidor
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
        console.log("Swagger docs available at http://localhost:3000/api-docs");
      });
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
    process.exit(1); // Terminar el proceso en caso de error en la conexión
  });

export default app;
