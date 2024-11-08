import { SwapiClient } from '../ports/swapiClient';
import { Personaje } from '../../domain/models/personaje';
import { v4 as uuidv4 } from 'uuid';

export class GetPersonajesSWAPI {
  private swapiClient: SwapiClient;

  constructor(swapiClient: SwapiClient) {
    this.swapiClient = swapiClient;
  }

  async execute(id: number): Promise<Personaje> {
    try {
      const personajeData = await this.swapiClient.fetchCharacter(id);

      const personaje: Personaje = {
        id: uuidv4(),
        nombre: personajeData.name,
        altura: personajeData.height,
        masa: personajeData.mass,
        color_ojos: personajeData.eye_color,
        color_cabello: personajeData.hair_color,
        genero: personajeData.gender,
      };

      return personaje;
    } catch (error) {
      // throw new Error(`Error al obtener personaje de SWAPI: ${error.message}`);
      if (error instanceof Error) {
        throw new Error(`Error al obtener personaje de SWAPI: ${error.message}`);
      } else {
        throw new Error('Error al obtener personaje de SWAPI');
      }
    }
  }
}
