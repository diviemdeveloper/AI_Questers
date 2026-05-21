------AI Questers Pokédex------

Proyecto final NTTDATA desarrollado por:

- David Velázquez Mateos
- Hugo Villa Cano
- Sergio Gutierrez Cabezas
- Daniel Villegas Mateos

---------------------------------------------------------------------------------------------------------

--Descripción

Pequeña pagina web que implementa todos los pokemons de primera generación para poder consultar en un listado por tipos
Relación 1:M — un Tipo tiene muchos Pokémon.

--Tecnologías

-Frontend: Angular 21
-Backend: Java 17 + Spring Boot + Spring Data JPA + Lombok
-Base de datos: H2 en memoria

---------------------------------------------------------------------------------------------------------

--Requisitos previos

-Java 17 instalado
-Node.js 18 o superior
-Angular CLI instalado:

Comando para instalar el Angular:
bash
npm install -g @angular/cli

---------------------------------------------------------------------------------------------------------

--Arrancar el proyecto

-Backend

powershell
cd backend/iaQuesters/iaQuesters
.\mvnw spring-boot:run


El backend arranca en: http://localhost:8080

Consola H2: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:aiquesters
- Usuario: sa
- Contraseña: ninguna

-Frontend

cd frontend/pokedex
npm install
ng serve


El frontend arranca en: http://localhost:4200

---------------------------------------------------------------------------------------------------------

-Endpoints de la API

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/tipos | Listar todos los tipos |
| GET | /api/tipos/{id} | Ver detalle de un tipo |
| POST | /api/tipos | Crear nuevo tipo |
| GET | /api/tipos/{id}/pokemones | Ver pokémon de un tipo |
| GET | /api/pokemones | Listar todos los pokémon |
| GET | /api/pokemones/{id} | Ver detalle de un pokémon |
| POST | /api/pokemones | Crear nuevo pokémon |
| PUT | /api/tipos/{id} | Editar un tipo |
| DELETE | /api/tipos/{id} | Borrar un tipo |
| PUT | /api/pokemones/{id} | Editar un pokémon |
| DELETE | /api/pokemones/{id} | Borrar un pokémon |

---------------------------------------------------------------------------------------------------------

## Modelo de datos
Tipo (1) ────── Pokémon (M)

id            - id
nombre        - nombre
color         - nivel
- tipo_id (FK)


---------------------------------------------------------------------------------------------------------

-Estructura del repositorio

AI_Questers/
├── backend/
│   └── iaQuesters/
│       └── iaQuesters/
│           ├── src/
│           │   ├── main/java/com/example/iaQuesters/
│           │   │   ├── controller/
│           │   │   ├── model/
│           │   │   ├── repository/
│           │   │   └── service/
│           │   └── resources/
│           │       ├── application.yml
│           │       └── data.sql
│           └── pom.xml
├── frontend/
│   └── pokedex/
│       └── src/app/
│           ├── components/
│           │   ├── lista-tipos/
│           │   ├── detalle-tipo/
│           │   ├── nuevo-tipo/
│           │   └── nuevo-pokemon/
│           └── services/
└── README.md

---------------------------------------------------------------------------------------------------------

-Criterios cubiertos

Componentes StandAlone
Signals
Formularios reactivos con validaciones
Servicios Angular con Observables
API REST con Spring Boot
Relación 1:M entre Tipo y Pokémon
Base de datos H2 en memoria
CRUD básico (listar, ver detalle, crear)
CRUD opcional (borrar, editar)

-Anotación

Al arrancar el backend se cargan automáticamente los 151 pokémon 
de la primera generación desde el archivo data.sql