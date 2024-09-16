import { Request, Response } from "express";
import { AttendeeService } from "../services/AttendeeService";

export class AttendeeController {
  static async register(req: Request, res: Response) {
    try {
      const attendee = await AttendeeService.register(req.body);
      return res.status(201).json(attendee);
    } catch (error) {
      
      return res.status(400).json({ errors: error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const attendees = await AttendeeService.getAll();
      return res.json(attendees);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching attendees' });
    }
  }
}