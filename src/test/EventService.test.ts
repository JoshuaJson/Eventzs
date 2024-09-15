import { getRepository } from 'typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm'
import { EventService } from '../services/EventService';
import { Event } from '../entities/Event';

jest.mock('typeorm', () => ({
  getRepository: jest.fn(),
}));

describe('EventService', () => {
  let mockEventRepository: any;

  beforeEach(() => {
    mockEventRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
    };
    (getRepository as jest.Mock).mockReturnValue(mockEventRepository);
  });

  it('should create a new event', async () => {
    const eventData = {
      name: 'Test Event',
      description: 'Test Description',
      date: new Date(),
      location: 'Test Location',
    };

    mockEventRepository.create.mockReturnValue(eventData);
    mockEventRepository.save.mockResolvedValue(eventData);

    const result = await EventService.createEvent(eventData);
    expect(result).toEqual(eventData);
    expect(mockEventRepository.create).toHaveBeenCalledWith(eventData);
    expect(mockEventRepository.save).toHaveBeenCalledWith(eventData);
  });

  it('should get all events', async () => {
    const events = [{ name: 'Event 1' }, { name: 'Event 2' }];
    mockEventRepository.find.mockResolvedValue(events);

    const result = await EventService.getAllEvents();
    expect(result).toEqual(events);
    expect(mockEventRepository.find).toHaveBeenCalled();
  });

  // Agrega pruebas adicionales para actualizar y eliminar eventos
});
