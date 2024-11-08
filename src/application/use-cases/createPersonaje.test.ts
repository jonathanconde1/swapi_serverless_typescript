import { PersonajeRepository } from "../../application/ports/personajeRepository";
import { CreatePersonaje } from "./createPersonaje";
import { Personaje } from "../../domain/models/personaje";

describe("createPersonaje", () => {
  it("debería crear un personaje", async () => {
    const nuevoPersonaje: Personaje = {
      id: "96ed5666-de97-46e4-8ac7-4b4e1c100e93",
      nombre: "Luke",
      altura: "172",
      masa: "77",
      color_ojos: "azul",
      color_cabello: "rubio",
      genero: "male",
    };

    const mockPersonajeRepo: jest.Mocked<PersonajeRepository> = {
      save: jest.fn(),
      getAll: jest.fn(),
    };

    const createPersonaje = new CreatePersonaje(mockPersonajeRepo);
    await createPersonaje.execute(nuevoPersonaje);

    const savedPersonaje = mockPersonajeRepo.save.mock.calls[0][0];
    expect(savedPersonaje).toMatchObject({
       nombre: "Luke",
       altura: "172",
       masa: "77",
       color_ojos: "azul",
       color_cabello: "rubio",
       genero: "male",
    });
    expect(savedPersonaje.id).not.toBe(nuevoPersonaje.id);
  });
});
