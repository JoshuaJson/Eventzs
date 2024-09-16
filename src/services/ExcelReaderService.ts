import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import { Repository } from 'typeorm';
import { Attendee } from '../entities/Attendee';
import { Event } from '../entities/Event';

export class ExcelReaderService {
  private AttendeeRepository: Repository<Attendee>;
  private EventRepository: Repository<Event>;

  constructor(AttendeeRepository: Repository<Attendee>, EventRepository: Repository<Event>) {
    this.AttendeeRepository = AttendeeRepository;
    this.EventRepository = EventRepository;
  }

  public async readAndSaveCSV(filePath: string): Promise<void> {
    const results: any[] = [];
    createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Definir el tamaño de la tanda
        const batchSize = 10;
        for (let i = 0; i < results.length; i += batchSize) {
          const currentBatch = results.slice(i, i + batchSize);
          // Procesar la tanda actual
          await this.processBatch(currentBatch);
        }
      });
  }

  private async processBatch(batch: any[]): Promise<void> {
    // Procesar cada elemento de la tanda
    for (const result of batch) {
      console.log('Processing result:', result); // Agregar registro para depuración
      if (result.password) {
        await this.processAssistant(result);
      } else {
        await this.processEvent(result);
      }
    }
  }

  private async processAssistant(result: any): Promise<void> {
    console.log('Processing assistant:', result); // Agregar registro para depuración
    // Verifica si el evento al que el asistente va a asistir existe
    const event = await this.EventRepository.findOneBy({ name: result.eventTitle });

    if (!event) {
      console.log(`Event with title '${result.eventTitle}' does not exist`);
      return;
    }

    // Verifica si el asistente ya está registrado por email o nombre
    const existsEmail = await this.AttendeeRepository.findOneBy({ email: result.email });
    const existsName = await this.AttendeeRepository.findOneBy({ name: result.name });

    if (!existsEmail && !existsName) {
      const attendee = this.AttendeeRepository.create({
        name: result.name,
        email: result.email,
        attendanceDate: new Date(result.attendanceDate), // Asigna la fecha de asistencia
        event: event, // Relaciona el evento con el asistente
      });

      await this.AttendeeRepository.save(attendee);
    } else {
      console.log(`The assistant already exists with email: ${result.email} or name: ${result.name}`);
    }
  }

  private async processEvent(result: any): Promise<void> {
    console.log('Processing event:', result);
  
    console.log('Event details before saving:', {
      name: result.name,
      description: result.description,
      startDate: new Date(result.startDate),
      endDate: new Date(result.endDate),
      location: result.location,
      latitude: parseFloat(result.latitude),
      longitude: parseFloat(result.longitude),
    });
  
    const existsEvent = await this.EventRepository.findOneBy({ name: result.name });
  
    console.log('Event found:', existsEvent);
  
    if (!existsEvent) {
      const event = this.EventRepository.create({
        name: result.name,
        description: result.description,
        startDate: new Date(result.startDate),
        endDate: new Date(result.endDate),
        location: result.location,  // Asegúrate de que `location` no esté vacío
        latitude: parseFloat(result.latitude),
        longitude: parseFloat(result.longitude),
      });
      await this.EventRepository.save(event);
      console.log(`Saved new event: ${result.name}`);
    } else {
      console.log(`The event already exists: ${result.name}`);
    }
  }
}
