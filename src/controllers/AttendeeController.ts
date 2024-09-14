import { Request, Response } from "express";
import { AttendeeService } from "../services/AttendeeService";

export class AttendeeController {
  static async register(req: Request, res: Response) {
    const attendee = await AttendeeService.register(req.body);
    return res.status(201).json(attendee);
  }

  static async getAll(req: Request, res: Response) {
    const attendees = await AttendeeService.getAll();
    return res.json(attendees);
  }
}