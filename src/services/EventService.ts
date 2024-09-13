import { getRepository } from "typeorm";
import { Event } from "../entities/Event";

export class EventService {
  static async createEvent(data: Partial<Event>) {
    const eventRepository = getRepository(Event);
    const newEvent = eventRepository.create(data);
    await eventRepository.save(newEvent);
    return newEvent;
  }

  static async getAllEvents() {
    const eventRepository = getRepository(Event);
    return await eventRepository.find();
  }
}
