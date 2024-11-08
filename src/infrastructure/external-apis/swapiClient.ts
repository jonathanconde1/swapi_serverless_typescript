// import { SwapiClient } from '../../application/ports/swapiClient';
// import { Personaje } from '../../domain/models/personaje';
// import axios from 'axios';
//
// export class SwapiSwapiClient implements SwapiClient {
//   async fetchPersonajes(): Promise<Personaje[]> {
//     const response = await axios.get('https://swapi.py4e.com/api/people/');
//     return response.data.results.map((data: any) => new Personaje(
//       uuidv4(),
//       data.name,
//       data.height,
//       data.mass,
//       data.eye_color,
//       data.hair_color
//     ));
//   }
// }


// src/infrastructure/external-apis/swapiClient.ts

import axios from 'axios';
import { SwapiClient } from '../../application/ports/swapiClient';

export class SwapiApiClient implements SwapiClient {
  async fetchCharacter(id: number): Promise<any> {
    try {
      const response = await axios.get(`https://swapi.py4e.com/api/people/${id}/`);
      return response.data;
    } catch (error) {
      // throw new Error(`Error al conectar con SWAPI: ${error.message}`);
      if (error instanceof Error) {
        throw new Error(`Error al conectar con SWAPI: ${error.message}`);
      } else {
        throw new Error('Error al conectar con SWAPI');
      }
      // throw new Error(`Error al conectar con SWAPI: ${(error as Error).message}`);
    }
  }
}
