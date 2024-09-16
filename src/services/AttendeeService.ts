import { getRepository } from "typeorm";
import { Attendee } from "../entities/Attendee";
import { validateOrReject } from "class-validator";

export class AttendeeService {
  static async register(data: Partial<Attendee>) {
    const attendee = new Attendee();
    Object.assign(attendee, data);
    await validateOrReject(attendee);
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