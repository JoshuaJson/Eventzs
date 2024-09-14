import { Request, Response } from "express";
import { EventService } from "../services/EventService";

export class EventController {
  static async create(req: Request, res: Response) {
    const event = await EventService.createEvent(req.body);
    return res.json(event);
  }

  static async getAll(req: Request, res: Response) {
    const events = await EventService.getAllEvents();
    return res.json(events);
  }
  static async update(req: Request, res: Response) {
    const updatedEvent = await EventService.updateEvent(req.params.id, req.body);
    return res.json(updatedEvent);
  }

  static async delete(req: Request, res: Response) {
    await EventService.deleteEvent(req.params.id);
    return res.status(204).send();
  }

}