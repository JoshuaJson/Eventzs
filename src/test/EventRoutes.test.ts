// __tests__/EventService.test.ts

import { getRepository } from "typeorm";
import { Event } from "../entities/Event";
import { EventService } from "../services/EventService";
import { validateOrReject } from "class-validator";

jest.mock("typeorm");

describe("EventService", () => {
  let eventRepositoryMock: any;

  beforeEach(() => {
    eventRepositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    (getRepository as jest.Mock).mockReturnValue(eventRepositoryMock);
  });

  it("should create an event", async () => {
    const eventData = { name: "Event 1", description: "Description 1", date: new Date(), location: "Location 1" };
    eventRepositoryMock.save.mockResolvedValue(eventData);

    const event = await EventService.createEvent(eventData);

    expect(event).toEqual(eventData);
    expect(validateOrReject).toHaveBeenCalledWith(expect.any(Event));
  });

  it("should get all events", async () => {
    const events = [{ name: "Event 1" }, { name: "Event 2" }];
    eventRepositoryMock.find.mockResolvedValue(events);

    const result = await EventService.getAllEvents();

    expect(result).toEqual(events);
  });

  it("should update an event", async () => {
    const id = 1;
    const eventData = { name: "Updated Event" };
    const updatedEvent = { ...eventData, id };
    eventRepositoryMock.update.mockResolvedValue({});
    eventRepositoryMock.findOne.mockResolvedValue(updatedEvent);

    const result = await EventService.updateEvent(id, eventData);

    expect(result).toEqual(updatedEvent);
    expect(eventRepositoryMock.update).toHaveBeenCalledWith(id, eventData);
  });

  it("should delete an event", async () => {
    const id = 1;
    eventRepositoryMock.delete.mockResolvedValue({ affected: 1 });

    await EventService.deleteEvent(id);

    expect(eventRepositoryMock.delete).toHaveBeenCalledWith(id);
  });
});
