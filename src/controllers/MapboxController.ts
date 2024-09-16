import { Request, Response } from 'express';
import { getNearbyPlaces } from '../mapbox/mapbox.service'; // Importa la función

export async function recommendNearbyPlaces(req: Request, res: Response) {
  const { latitude, longitude, radius } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const places = await getNearbyPlaces(Number(latitude), Number(longitude), Number(radius) || 1000);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nearby places' });
  }
}
