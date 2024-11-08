import { APIGatewayProxyHandler } from 'aws-lambda';
import { PostgresPersonajeRepository } from '../database/personajeRepository';
import { CreatePersonaje } from '../../application/use-cases/createPersonaje';
import { GetPersonajes } from '../../application/use-cases/getPersonajes';
import { SwapiApiClient } from '../external-apis/swapiClient';
import { GetPersonajesSWAPI } from '../../application/use-cases/getPersonajesSWAPI';


const personajeRepository = new PostgresPersonajeRepository();
const swapiClient = new SwapiApiClient();
const getPersonajesSWAPI = new GetPersonajesSWAPI(swapiClient);

const createPersonajeUseCase = new CreatePersonaje(personajeRepository);
const getPersonajesUseCase = new GetPersonajes(personajeRepository);

export const getPersonajes: APIGatewayProxyHandler = async () => {
  const personajes = await getPersonajesUseCase.execute();
  return {
    statusCode: 200,
    body: JSON.stringify(personajes),
  };
};

// export const createPersonaje: APIGatewayProxyHandler = async (event) => {
//   const data = JSON.parse(event.body || '{}');
//   const personaje = await createPersonajeUseCase.execute(data);
//   return {
//     statusCode: 200,
//     body: JSON.stringify(personaje),
//   };
// };

export const createPersonaje: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || '{}');

    const personaje = await createPersonajeUseCase.execute(data);

    return {
      statusCode: 200,
      message:'Personaje creado exitosamente.',
      body: JSON.stringify(personaje),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error en el servidor al crear personaje',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export const getPersonajeFromSWAPI: APIGatewayProxyHandler = async (event) => {
  const id = parseInt(event.pathParameters?.id || '1', 10);

  try {
    const personaje = await getPersonajesSWAPI.execute(id);
    return {
      statusCode: 200,
      body: JSON.stringify(personaje),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener personaje de SWAPI' }),
    };
  }
};
