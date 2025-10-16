# API de Notas con NestJS y Docker

### ¿Qué es esto?

Es el backend que armé para una app de notas. Una API REST hecha con NestJS que se conecta a una base de datos PostgreSQL.

### ¿Con qué lo hice?

* **Backend:** NestJS, TypeScript
* **Base de Datos:** PostgreSQL con TypeORM
* **Para que todo ande:** Docker y Docker-Compose

### ¿Y qué hace?

* Crear, leer, editar y borrar notas (CRUD).
* Archivar y desarchivar notas para sacarlas de la vista principal.
* Ponerle varios tags (etiquetas) a una nota.
* Filtrar las notas para ver solo las que tienen un tag específico.

### Para levantarlo en tu máquina

Gracias a Docker, es una facil.

1.  **Cloná el repo:**
    `git clone https://github.com/Kenchoooo/nestjs-notes-api.git`

2.  **Metete en la carpeta:**
    `cd nestjs-notes-api`

3.  **Dale permisos al script** (lo hacés una sola vez):
    `chmod +x run.sh`

4.  **Y corrélo:**
    `./run.sh`

La API queda andando en `http://localhost:3000`. Podés probarla con Postman o lo que uses.

### Los Endpoints (por si querés chusmear)

* `GET /notes` -> Te da todas las notas activas.
* `GET /notes?tag=trabajo` -> Te da solo las notas con el tag "trabajo".
* `POST /notes` -> Crea una nota. Mandale un JSON en el body con `title` y `content`.
* `PATCH /notes/:id` -> Edita una nota.
* `DELETE /notes/:id` -> Borra una nota.
* `PATCH /notes/:id/archive` -> La archiva.
* `PATCH /notes/:id/unarchive` -> La desarchiva.
* `PATCH /notes/:id/tags` -> Le ponés los tags. Mandale un JSON en el body así: `{ "tags": ["trabajo", "idea"] }`.
