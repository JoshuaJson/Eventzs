import { getRepository } from "typeorm";
import { Event } from "../entities/Event";
import { validateOrReject } from "class-validator";

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
}

