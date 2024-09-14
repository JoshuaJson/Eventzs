import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";



// load .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.get('/', (req, res) => {
  res.send('event management');
});

app.listen(port, () => {
  console.log(`Server on port:  ${port}`);
  console.log("Swagger docs available at http://localhost:3000/api-docs");
});