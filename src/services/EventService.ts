import { getRepository } from "typeorm";
import { Event } from "../entities/Event";

export class EventService {
  static async createEvent(data: Partial<Event>) {
    const eventRepository = getRepository(Event);
    const newEvent = eventRepository.create(data);
    await eventRepository.save(newEvent);
    return newEvent;
  }
  //get all
  static async getAllEvents() {
    const eventRepository = getRepository(Event);
    return await eventRepository.find();
  }
  static async updateEvent(id: string, data: Partial<Event>) {
    const eventRepository = getRepository(Event);
    const eventId = parseInt(id, 10);
    await eventRepository.update(eventId, data);
    return await eventRepository.findOneBy({ id: eventId });
  }
  // delete 
  static async deleteEvent(id: string) {
    const eventRepository = getRepository(Event);
    await eventRepository.delete(id);
  }
}

