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
}