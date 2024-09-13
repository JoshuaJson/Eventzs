import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";



// load .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas de la API
app.get('/', (req, res) => {
  res.send('event management');
});

app.listen(port, () => {
  console.log(`Server on port:  ${port}`);
});