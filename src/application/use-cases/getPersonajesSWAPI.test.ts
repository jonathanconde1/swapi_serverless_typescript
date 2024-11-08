// tests/application/use-cases/getPersonajesSWAPI.test.ts
import { SwapiApiClient } from '../../../src/infrastructure/external-apis/swapiClient';
import { GetPersonajesSWAPI } from '../../../src/application/use-cases/getPersonajesSWAPI';

jest.mock('../../../src/infrastructure/external-apis/swapiClient');

describe('GetPersonajesSWAPI', () => {
  const mockSwapiClient = new SwapiApiClient() as jest.Mocked<SwapiApiClient>;
  const getPersonajesSWAPI = new GetPersonajesSWAPI(mockSwapiClient);

  it('debería obtener un personaje de SWAPI y retornar datos traducidos', async () => {
    mockSwapiClient.fetchCharacter.mockResolvedValue({
      id: "bfe287b3-d8cb-4334-9b58-91eddfc7dcf9",
      name: 'Luke Skywalker',
      height: "172",
      mass: "77",
      eye_color: 'blue',
      hair_color: 'blond',
      gender: 'male',
    });

    const personaje = await getPersonajesSWAPI.execute(1);
    expect(personaje.nombre).toEqual(
      'Luke Skywalker'
    );
  });
});
