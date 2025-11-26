# Blog Project Fullstack

Este es un proyecto de aplicación web completa tipo Blog, construido con una arquitectura moderna y contenerizada.

## Tech Stack

### Backend
- **Lenguaje:** Python 3.13
- **Framework:** Django 5.2 + Django Rest Framework
- **Gestor de Paquetes:** uv
- **Base de Datos:** PostgreSQL 17 (Alpine)

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Lenguaje:** JavaScript/JSX

### Infraestructura & DevOps
- **Contenerización:** Docker & Docker Compose
- **Servidor Web:** Nginx (Reverse Proxy)

## Estructura del Proyecto

```
.
├── backend/            # Código fuente de la API Django
├── frontend/           # Código fuente de la aplicación React
├── nginx/              # Configuración del servidor web
├── docker-compose.yml  # Orquestación de servicios para producción
└── docker-compose.dev.yml # Orquestación para desarrollo
```

## Instalación y Uso

### Prerrequisitos
- Docker y Docker Compose instalados en tu sistema.

### Ejecución en Desarrollo

Para levantar el entorno de desarrollo con recarga automática (hot-reload):

```bash
docker-compose -f docker-compose.dev.yml up --build
```

El frontend estará disponible en `http://localhost:5173` (o el puerto configurado en Vite) y la API en `http://localhost:8000`.

### Ejecución en Producción

Para levantar el entorno optimizado para producción:

```bash
docker-compose up --build -d
```

La aplicación estará servida a través de Nginx en `http://localhost` (puerto 80).

## Características Principales

- **Arquitectura Desacoplada:** Frontend y Backend separados, comunicándose vía API REST.
- **Docker Ready:** Configuración lista para desplegar en cualquier entorno compatible con Docker.
- **Gestión Eficiente:** Uso de `uv` para una gestión de dependencias de Python ultrarrápida.
