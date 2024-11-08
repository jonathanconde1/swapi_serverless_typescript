import { PersonajeRepository } from '../ports/personajeRepository';
import { Personaje } from '../../domain/models/personaje';

export class GetPersonajes {
  constructor(private personajeRepository: PersonajeRepository) {}

  async execute(): Promise<Personaje[]> {
    return await this.personajeRepository.getAll();
  }
}
