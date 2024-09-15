import { Router } from 'express';
import { upload } from '../excel/upload-config';
import { ExcelReaderController } from '../controllers/ExcelReaderController';
import { ExcelReaderService } from '../services/ExcelReaderService';
import { getRepository } from 'typeorm';
import { Attendee } from '../entities/Attendee';
import { Event } from '../entities/Event';

const router = Router();

const AttendeeRepository = getRepository(Attendee);
const eventsRepository = getRepository(Event);
const excelReaderService = new ExcelReaderService(AttendeeRepository, eventsRepository);
const excelReaderController = new ExcelReaderController(excelReaderService);

router.post('/api/v1/excel/upload-csv', upload.single('file'), excelReaderController.uploadCSV.bind(excelReaderController));

export default router;
