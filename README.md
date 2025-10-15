# Aplicación de Notas - Ejercicio Full Stack Ensolvers

Esta es una aplicación web simple que permite a los usuarios crear, editar, eliminar, archivar y listar sus notas personales. El proyecto está estructurado como una Single Page Application (SPA) con un backend de API RESTful.

---

## Tecnologías Utilizadas

* **Backend:** Node.js (v22.20.0), NestJS (v11.0.1), TypeORM
* **Base de Datos:** PostgreSQL (v13)
* **Frontend:** (Pendiente de implementación)
* **Contenerización:** Docker & Docker Compose

---

## Prerrequisitos

Para ejecutar esta aplicación, solo necesitas tener instalado:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Cómo Ejecutar la Aplicación

1.  Clona este repositorio en tu máquina.
2.  Abre una terminal en la carpeta raíz del proyecto.
3.  Otorga permisos de ejecución al script:
    ```bash
    chmod +x run.sh
    ```
4.  Ejecuta el script:
    ```bash
    ./run.sh
    ```
5.  ¡Listo! El backend estará disponible en `http://localhost:3000`. Puedes empezar a probar los endpoints con una herramienta como Postman.

---

## API Endpoints (Fase 1)

### Notas

* `GET /notes`: Obtiene todas las notas activas.
* `POST /notes`: Crea una nueva nota.
    * Body: `{ "title": "string", "content": "string" }`
* `PATCH /notes/:id`: Actualiza el título o contenido de una nota.
    * Body: `{ "title"?: "string", "content"?: "string" }`
* `DELETE /notes/:id`: Elimina una nota.

### Archivo

* `GET /notes/archived/all`: Obtiene todas las notas archivadas.
* `PATCH /notes/:id/archive`: Archiva una nota.
* `PATCH /notes/:id/unarchive`: Desarchiva una nota.