import { Request, Response } from 'express';
import { ExcelReaderService } from '../services/ExcelReaderService';

export class ExcelReaderController {
  private excelReaderService: ExcelReaderService;

  constructor(excelReaderService: ExcelReaderService) {
    this.excelReaderService = excelReaderService;
  }

  public async uploadCSV(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const filePath = req.file.path;
      await this.excelReaderService.readAndSaveCSV(filePath);

      res.status(200).json({ message: 'CSV file processed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
