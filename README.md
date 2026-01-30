# Sistema Editorial – Microservicios Authors y Publications
#### Realizado por: Adriana Borja

Este proyecto implementa una arquitectura de microservicios para la gestión de Autores y Publicaciones, integrando un frontend en React, dos microservicios backend en Spring Boot, y bases de datos independientes, todo orquestado mediante Docker Compose.

## Arquitectura General

La solución está compuesta por los siguientes servicios:

* authors-service: Microservicio encargado de la gestión de autores.

* publications-service: Microservicio encargado de la gestión de publicaciones y su estado editorial.

* frontend: Aplicación web desarrollada en React + Material UI.

* db-authors: Base de datos PostgreSQL para el microservicio de autores.

* db-publications: Base de datos MySQL para el microservicio de publicaciones.

Cada microservicio mantiene su propia base de datos, evitando dependencias circulares y respetando el principio de independencia entre servicios.

## Tecnologías Utilizadas

* **Backend**
    * Java 21
    * Spring Boot
    * JPA/Hibernate
    * PostgreSQL
    * MySQL
* **Frontend**
    * React
    * Vite
    * Material UI
    * Axios
* **Infraestructura**
    * Docker
    * Docker Compose

## Puertos Utilizados

* Frontend: 5173
* Authors Service: 8081
* Publications Service: 8082
* PostgreSQL (Authors): 5432
* MySQL (Publications): 3306

## Variables de Entorno

* Debe crearse un archivo .env en la raíz del proyecto, donde se encuentra el docker-compose.yml.
* Debe crearse un archivo .env.docker dentro de la carpeta del frontend, en caso de ejecutar localmente tambien se debe crear un archivo .env.local y colocar la misma información que se encuentra en el archivo .env.example en los dos casos.

**Se incluye archivos .env.example para que se pueda crear correctamente los archivos .env** 

## Despliegue con Docker

### Requisitos Previos
* Docker Desktop instalado y corriendo
* Docker Compose habilitado
* Git

### Pasos para levantar el proyecto con Docker
1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
```
2. Ubicarse en la raíz del proyecto
```bash
cd microservices-authors-publications
```
3. Crear el archivo .env
Usar como base el archivo .env.example y definir las credenciales reales.
4. Ubicarse en la carpeta del frontend 
```bash
cd microservices-authors-publications/frontend
```
5. Crear el archivo .env.docker
Copiar la información que se encuentra en el archivo .env.example de esa carpeta.
6. Levantar todos los servicios
```bash
docker compose up --build
```
7. Acceder a la aplicación
* Frontend: 
    * http://localhost:5173
    * Descripción: Interfaz gráfica del sistema editorial.
* Authors API: 
    * http://localhost:8081/authors
    * Descripción: Microservicio para la gestión de autores

* Publications API: 
    * http://localhost:8082/publications
    * Descripción: Microservicio para la gestión de publicaciones editoriales. 

## Comunicación entre Microservicios
* El microservicio Publications valida la existencia del autor consultando al microservicio Authors mediante un adaptador (Adapter Pattern).
* La URL del servicio de autores se configura por entorno:
    * En Docker: http://authors-service:8081
    * En local: http://localhost:8081
* No existe acceso directo entre bases de datos.

## Ejecución en Local (Opcional)
Cada microservicio puede ejecutarse de forma independiente:
1. Levantar las bases de datos localmente (PostgreSQL y MySQL)
    * Crear en postgreSQL la base de datos: db-authors.
    * Crear en MySQL la base de datos: db-publications.
2. Ejecutar:
    * authors-service en el puerto 8081.
    * publications-service en el puerto 8082.
3. Ejecutar en el frontend
```bash
npm install
npm run dev
```
Esto instalará todas las dependencias necesarias incluyendo React, Material UI, Axios, etc.
4. En los microservicios authors-service y publications-servive se recomienda ejecutarse desde el IDE IntelliJ y correrlo para probar su funcionamiento. 


## Para una explicación mas detallada revisar el documento técnico. Este mismo se encuentra en la raiz del proyecto. 



