import { getRepository } from "typeorm";
import { Event } from "../entities/Event";
import { validateOrReject } from "class-validator";
import { Attendee } from "../entities/Attendee";

export class EventService {
  //create
  static async createEvent(data: Partial<Event>) {
    const event = new Event();
    Object.assign(event, data);
    await validateOrReject(event);
    const eventRepository = getRepository(Event);
    await eventRepository.save(event);
    return event;
  }
  //get all
  static async getAllEvents() {
    const eventRepository = getRepository(Event);
    return await eventRepository.find();
  }
  // update 
  static async updateEvent(id: number, data: Partial<Event>) {
    const eventRepository = getRepository(Event);
    await eventRepository.update(id, data);
    const updatedEvent = await eventRepository.findOne({
      where: { id }
    });
    if (updatedEvent) {
      Object.assign(updatedEvent, data); 
      await validateOrReject(updatedEvent); 
    }
    return updatedEvent;
  }
  // delete 
  static async deleteEvent(id: number) {
    const eventRepository = getRepository(Event);
    await eventRepository.delete(id);
  }
  // get event by ID
  static async getEventById(id: number): Promise<Event | undefined> {
    const eventRepository = getRepository(Event);
    return await eventRepository.findOne({ where: { id } });
  }

  static async getEventDetails(id: number) {
    const eventRepository = getRepository(Event);
    const attendeeRepository = getRepository(Attendee);

    // Encuentra el evento y su fecha de inicio
    const event = await eventRepository.findOne({ 
      where: { id }, 
      select: ["startDate"] 
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // Cuenta los asistentes al evento usando la relación `event`
    const numberOfAttendees = await attendeeRepository.count({ 
      where: { event: { id } }
    });

    // Obtén los nombres y las fechas de asistencia de los asistentes
    const attendees = await attendeeRepository.find({
      where: { event: { id } },
      select: ["name", "attendanceDate"]
    });

    // Calcula el día de la semana del evento
    const startDate = new Date(event.startDate);
    const dayOfWeek = startDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Extrae los días de la semana junto con los nombres de los asistentes
    const attendanceDetails = attendees.map(att => {
      const date = new Date(att.attendanceDate);
      const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long' });
      return {
        name: att.name,
        attendanceDay: formattedDate
      };
    });

    return {
      numberOfAttendees,
      dayOfWeek,
      attendanceDetails
    };
  }
}

