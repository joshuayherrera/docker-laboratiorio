# 🚀 CRM SENATI - Sistema de Gestión de Relaciones con Clientes

Un sistema CRM completo desarrollado con Node.js, MySQL y Docker. Perfecto para gestionar clientes, contactos y oportunidades de negocio.

## 📋 Características

- ✅ **Gestión de Clientes**: Crear, leer, actualizar y eliminar clientes
- ✅ **Base de Datos MySQL**: Persistencia de datos con MySQL 8.0
- ✅ **API RESTful**: Endpoints completos para operaciones CRUD
- ✅ **Validaciones**: Control de duplicados y validación de datos
- ✅ **Containerizado**: Completamente dockerizado para fácil despliegue
- ✅ **Nginx**: Proxy reverso para mejor rendimiento

## 🛠️ Tecnologías

- **Backend**: Node.js + Express
- **Base de Datos**: MySQL 8.0
- **Proxy**: Nginx
- **Containerización**: Docker & Docker Compose
- **Despliegue**: Docker Hub

## ⚡ Instalación Rápida

### Prerrequisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Git](https://git-scm.com/) instalado

### Pasos de Instalación

```bash
# 1. Clonar el proyecto
git clone https://github.com/joshuayherrera/docker-laboratiorio.git
cd docker-laboratiorio

# 2. Ejecutar Docker
docker-compose -f docker-compose.prod.yml up -d

# 3. ¡Listo! Ir a http://localhost
```

## 🌐 Uso de la API

### Endpoints Disponibles

| Método | Endpoint           | Descripción                |
| ------ | ------------------ | -------------------------- |
| GET    | `/`                | Página de bienvenida       |
| GET    | `/api/clients`     | Obtener todos los clientes |
| GET    | `/api/clients/:id` | Obtener cliente por ID     |
| POST   | `/api/clients`     | Crear nuevo cliente        |
| PUT    | `/api/clients/:id` | Actualizar cliente         |
| DELETE | `/api/clients/:id` | Eliminar cliente           |

### Ejemplo de Uso

```bash
# Obtener todos los clientes
curl http://localhost/api/clients

# Crear un nuevo cliente
curl -X POST http://localhost/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "Mi Empresa",
    "industry": "Tecnología",
    "phone": "555-1234",
    "website": "https://miempresa.com"
  }'
```

## 📊 Estructura de Base de Datos

### Tabla: clients

```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- business_name (VARCHAR(255), UNIQUE, NOT NULL)
- industry (VARCHAR(100))
- phone (VARCHAR(20))
- website (VARCHAR(255))
- creation_date (TIMESTAMP)
```

### Tabla: contacts

```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- client_id (INT, FOREIGN KEY)
- contact_name (VARCHAR(255), NOT NULL)
- contact_lastname (VARCHAR(100))
- email (VARCHAR(255), UNIQUE)
- position (VARCHAR(100))
- creation_date (TIMESTAMP)
```

### Tabla: oportunities

```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- client_id (INT, FOREIGN KEY)
- oportunity_name (VARCHAR(255), NOT NULL)
- amount (DECIMAL(10,2))
- stage (ENUM)
- close_date (DATE)
- creation_date (TIMESTAMP)
```

## 🔧 Comandos Útiles

```bash
# Ver logs de los contenedores
docker-compose -f docker-compose.prod.yml logs

# Detener los contenedores
docker-compose -f docker-compose.prod.yml down

# Actualizar las imágenes
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Acceder a la base de datos MySQL
docker-compose -f docker-compose.prod.yml exec private_db mysql -u appuser -p123 crmsenatidb
```

## 🚀 Para Desarrolladores

Si quieres modificar el código fuente:

```bash
# Usar el docker-compose de desarrollo
docker-compose up --build -d

# Esto reconstruirá las imágenes localmente
```

## 📝 Variables de Entorno

| Variable      | Valor por Defecto | Descripción                |
| ------------- | ----------------- | -------------------------- |
| `DB_HOST`     | `private_db`      | Host de la base de datos   |
| `DB_USER`     | `appuser`         | Usuario de MySQL           |
| `DB_PASSWORD` | `123`             | Contraseña de MySQL        |
| `DB_NAME`     | `crmsenatidb`     | Nombre de la base de datos |

## 🐳 Docker Hub

La imagen del backend está disponible en Docker Hub:

- **Imagen**: `joshuayherrera/crm-senati-backend:latest`
- **Repositorio**: [Docker Hub](https://hub.docker.com/r/joshuayherrera/crm-senati-backend)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📧 Contacto

- **Desarrollador**: Joshua Herrera
- **GitHub**: [@joshuayherrera](https://github.com/joshuayherrera)

---

⭐ ¡Si te gusta este proyecto, dale una estrella!
