import { getRepository } from "typeorm";
import { Attendee } from "../entities/Attendee";

export class AttendeeService {
  static async register(data: Partial<Attendee>) {
    const attendeeRepository = getRepository(Attendee);
    const newAttendee = attendeeRepository.create(data);
    await attendeeRepository.save(newAttendee);
    return newAttendee;
  }

  static async getAll() {
    const attendeeRepository = getRepository(Attendee);
    return await attendeeRepository.find();
  }
}