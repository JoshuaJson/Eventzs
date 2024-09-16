import { Request, Response } from "express";
import * as xlsx from 'xlsx';
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
    const eventId = parseInt(req.params.id, 10); 
    if (isNaN(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const updatedEvent = await EventService.updateEvent(eventId, req.body);
    return res.json(updatedEvent);
  }

  static async delete(req: Request, res: Response) {
    const eventId = parseInt(req.params.id, 10); // Convertir de string a number
    if (isNaN(eventId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    await EventService.deleteEvent(eventId);
    return res.status(204).send();
  }

  static async getEventDetails(req: Request, res: Response) {
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    try {
      const eventDetails = await EventService.getEventDetails(eventId);
      return res.json(eventDetails);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}