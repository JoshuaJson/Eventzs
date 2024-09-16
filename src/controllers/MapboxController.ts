import { Request, Response } from 'express';
import { getNearbyPlaces } from '../mapbox/mapbox.service'; // Importa la función
import { EventService } from '../services/EventService';

const eventService = new EventService();

export async function recommendNearbyPlaces(req: Request, res: Response) {
    const eventId = parseInt(req.params.id, 10);
  
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
  
    try {
      const event = await EventService.getEventById(eventId); 
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
       
        const latitude = parseFloat(event.latitude.toString()); // Convertir a número
        const longitude = parseFloat(event.longitude.toString()); // Convertir a número
        const radius = parseFloat(req.query.radius as string) || 1000;

      const places = await getNearbyPlaces(latitude, longitude, radius);
      res.json(places);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      res.status(500).json({ error: 'Failed to fetch nearby places' });
    }
  }