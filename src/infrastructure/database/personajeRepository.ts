import { PersonajeRepository } from '../../application/ports/personajeRepository';
import { Personaje } from '../../domain/models/personaje';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

export class PostgresPersonajeRepository implements PersonajeRepository {
  private pool: Pool;

  constructor() {
    // this.pool = new Pool({
    //   user: 'serverless',
    //   host: 'localhost',
    //   database: 'swapi',
    //   password: '123456',
    //   port: 5432,
    // });

    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async save(personaje: Personaje): Promise<void> {
    const query = `
      INSERT INTO personajes (id, nombre, altura, masa, color_ojos, color_cabello, genero)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    await this.pool.query(query, [
      personaje.id,
      personaje.nombre,
      personaje.altura,
      personaje.masa,
      personaje.color_ojos,
      personaje.color_cabello,
      personaje.genero,
    ]);
  }

  async getAll(): Promise<Personaje[]> {
    const result = await this.pool.query('SELECT * FROM personajes');
    return result.rows.map(
      (row) =>
        new Personaje(
          row.id,
          row.nombre,
          row.altura,
          row.masa,
          row.color_ojos,
          row.color_cabello,
          row.genero
        )
    );
  }
}
