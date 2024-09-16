import { Router } from 'express';
import { upload } from '../excel/upload-config';
import { ExcelReaderController } from '../controllers/ExcelReaderController';
import { ExcelReaderService } from '../services/ExcelReaderService';
import { getRepository } from 'typeorm';
import { Attendee } from '../entities/Attendee';
import { Event } from '../entities/Event';


const router = Router();

// Función para configurar las rutas
export const configureExcelRoutes = async () => {
  // Espera a que la base de datos esté conectada
  const AttendeeRepository = getRepository(Attendee);
  const eventsRepository = getRepository(Event);
  const excelReaderService = new ExcelReaderService(AttendeeRepository, eventsRepository);
  const excelReaderController = new ExcelReaderController(excelReaderService);

  // Define la ruta para subir el archivo CSV
  router.post('/upload-csv', upload.single('file'), excelReaderController.uploadCSV.bind(excelReaderController));

  return router;
};

export default router;
