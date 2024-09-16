import { createConnection } from 'typeorm';
import { Attendee } from './entities/Attendee';
import { Event } from './entities/Event';

export const initializeDatabase = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Attendee, Event],
    synchronize: true, // Solo para desarrollo, no usar en producción
  });
};
