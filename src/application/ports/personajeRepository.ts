import { Personaje } from '../../domain/models/personaje';

export interface PersonajeRepository {
  save(personaje: Personaje): Promise<void>;
  getAll(): Promise<Personaje[]>;
}
