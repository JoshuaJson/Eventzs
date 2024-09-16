import MapboxClient from '@mapbox/mapbox-sdk';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import dotenv from 'dotenv';
dotenv.config();

const mapboxToken = process.env.MAPBOX_TOKEN;
const client = MapboxClient({ accessToken: mapboxToken });
const geocoding = MapboxGeocoding(client);

export async function getNearbyPlaces(latitude: number, longitude: number, radius: number = 1000): Promise<any> {
    try {
      // Asegúrate de que las coordenadas se pasen como números y en el formato [longitude, latitude]
      const response = await geocoding.reverseGeocode({
        query: [longitude, latitude], // Mapbox espera [longitude, latitude]
        types: ['poi'], 
      }).send();
  

      return response.body.features;
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      throw error;
    }
  }