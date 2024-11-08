# swapi_serverless_typescript

## Getting started
git clone https://github.com/jonathanconde1/swapi_serverless_typescript
npm install

no olvidarse crear el .env

npx serverless offline

## Test and Deploy
npx jest

npx serverless deploy

## Example .env

DATABASE_URL=127.0.0.1

DB_HOST=127.0.0.1
DB_USER=serverless
DB_PORT=5432
DB_PASSWORD=123456
DB_NAME=swapi


## Database Postgres

* Generando base de datos postgres en local

  CREATE DATABASE swapi;
  CREATE USER serverless WITH PASSWORD '123456';
  GRANT ALL PRIVILEGES ON DATABASE swapi to serverless;
  \c swapi
  GRANT ALL PRIVILEGES ON SCHEMA public TO serverless;

* Consulta para generar tabla personajes

  CREATE TABLE personajes (
    id UUID PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    altura NUMERIC(5, 2),  -- Puedes ajustar el tipo de dato según el formato
    masa NUMERIC(5, 2),    -- Similar para masa
    color_ojos VARCHAR(50),
    color_cabello VARCHAR(50)
  );


### Insertar parametros desde la terminal en localhost
curl -X POST http://localhost:3000/dev/personajes -H "Content-Type: application/json" -d '{"nombre": "Luke Skywalker", "altura": 1.72, "masa": 73, "color_ojos": "azules", "color_cabello": "rubio, "genero": "male""}'

curl -X POST http://localhost:3000/dev/personajes -H "Content-Type: application/json" -d '{"nombre": "Eli Jonathan", "altura": 1.75, "masa": 73, "color_ojos": "Marron", "color_cabello": "negro", "genero": "male"}'

## Documentacion de rutas

https://editor.swagger.io/

El archivo que contiene la documentación esta en la raiz (./swagger.yml)

## Project status
En construcción
