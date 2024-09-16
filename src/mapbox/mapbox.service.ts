import MapboxClient from '@mapbox/mapbox-sdk';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const mapboxToken = 'pk.eyJ1IjoiaWNlc2lldmVycyIsImEiOiJjbTE0ZDZiY3AxbXE3MmlwcTY1YjF4djhtIn0.PLFkBFF_YRtnWkg-nJABHA';
const client = MapboxClient({ accessToken: mapboxToken });
const geocoding = MapboxGeocoding(client);

export async function getNearbyPlaces(latitude: number, longitude: number, radius: number = 1000): Promise<any> {
    try {
      // Asegúrate de que las coordenadas se pasen como números y en el formato [longitude, latitude]
      const response = await geocoding.reverseGeocode({
        query: [longitude, latitude], // Mapbox espera [longitude, latitude]
        types: ['poi'], // Asegúrate de que esto sea un array
      }).send();
  
      // Aquí puedes filtrar los resultados según el radio si es necesario
      return response.body.features;
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      throw error;
    }
  }