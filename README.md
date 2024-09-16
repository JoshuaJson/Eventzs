# Eventzs

## Descripción

**Eventzs** es una plataforma de gestión de eventos basada en una API RESTful que permite a los usuarios crear, promocionar y gestionar eventos de manera eficiente. Los usuarios pueden registrarse para asistir a eventos y consultar detalles sobre ellos, incluyendo información detallada y lugares cercanos recomendados.

## Características

- **Creación, eliminación, actualización y consulta de eventos.**
- **Registro de asistentes y detalles de eventos.**
- **Consulta de lugares cercanos a eventos usando Mapbox.**
- **Procesamiento y carga de eventos desde archivos Excel.**

## Desarrollo de la API RESTful

La API está construida utilizando **TypeScript** y **Express**, siguiendo una arquitectura limpia y modular. Puedes consultar toda la documentación y los endpoints disponibles en Swagger en el siguiente enlace:

[Swagger API Docs](http://localhost:3000/api-docs/#/)

## Base de Datos

Utilizamos **PostgreSQL** para gestionar la base de datos. Las principales tablas son:

- **Event**: Registra la información de los eventos.
- **Attend**: Registra las personas que asistirán a los eventos.

## Procesamiento de Archivos Excel

La plataforma soporta la carga de eventos desde archivos Excel. Puedes subir archivos en formato `.csv` usando la plantilla proporcionada en la ruta:


## Recomendación de Lugares Cercanos

Para la recomendación de lugares cercanos a eventos, utilizamos la API de **Mapbox**. La plataforma registra la longitud y latitud de los eventos en la base de datos y obtiene puntos de interés cercanos.

## Docker y Despliegue

La aplicación y la base de datos están dockerizadas. Puedes encontrar la configuración en los siguientes archivos:

- `docker-compose.yml`: Configuración principal.
- `docker-compose1.yml`: Configuración para ejecutar 5 réplicas del aplicativo.

1. **Ejecutar stack de replicas con docker swarm:**
     ```bash
        docker deploy -c docker-compose1.yml "nombre del servicio" 
    ```

## Implementación de CI/CD

La integración continua y el despliegue continuo (CI/CD) están configurados en GitHub Actions. Puedes encontrar la configuración en el archivo:


El pipeline se activa con cualquier commit o pull request realizado a la rama `main`.


## Instalación y Uso

Para iniciar el proyecto localmente, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/JoshuaJson/Eventzs.git
   ```
   
2. **instala dependecias:**
    ```bash
    npm install
    ```
3. **Correrlo en docker:**
    ```bash
    docker-compose up
    ```




