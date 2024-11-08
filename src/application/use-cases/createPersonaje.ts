import { PersonajeRepository } from '../ports/personajeRepository';
import { Personaje } from '../../domain/models/personaje';
import { v4 as uuidv4 } from "uuid";

export class CreatePersonaje {
  constructor(private personajeRepository: PersonajeRepository) {}

  async execute(personajeData: Omit<Personaje, 'id'>): Promise<Personaje> {
    const personaje = new Personaje(
      uuidv4(),
      personajeData.nombre,
      personajeData.altura,
      personajeData.masa,
      personajeData.color_ojos,
      personajeData.color_cabello,
      personajeData.genero
    );

    await this.personajeRepository.save(personaje);
    return personaje;
  }
}
