# 🚀 Instrucciones de Despliegue - UNAB Sporting Court

## 📋 Requisitos Previos

En el computador donde vas a desplegar, necesitas tener instalado:

1. **Docker Desktop** (Windows/Mac) o **Docker Engine** (Linux)
2. **Docker Compose** (usualmente viene incluido con Docker Desktop)

## 🔧 Pasos para Desplegar en Otro PC

### 1️⃣ Descargar solo el archivo necesario

En el nuevo PC, crea una carpeta y descarga solo el archivo `docker-compose.prod.yml`:

```powershell
# Crear carpeta
mkdir unab-sporting-court
cd unab-sporting-court

# Descargar el archivo desde GitHub
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/ImplementacionFirebase/docker-compose.prod.yml" -OutFile "docker-compose.prod.yml"
```

### 2️⃣ Iniciar los contenedores

```powershell
docker-compose -f docker-compose.prod.yml up -d
```

### 3️⃣ Verificar que los contenedores estén corriendo

```powershell
docker ps
```

Deberías ver 3 contenedores:
- `unab-sporting-db` (PostgreSQL)
- `unab-sporting-backend` (API FastAPI)
- `unab-sporting-frontend` (Nginx + Vue.js)

### 4️⃣ Acceder a la aplicación

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## 🛑 Detener la Aplicación

```powershell
docker-compose -f docker-compose.prod.yml down
```

## 🗑️ Eliminar TODO (incluidos volúmenes/datos)

```powershell
docker-compose -f docker-compose.prod.yml down -v
```

## 📊 Ver Logs

Ver logs de todos los servicios:
```powershell
docker-compose -f docker-compose.prod.yml logs -f
```

Ver logs de un servicio específico:
```powershell
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f db
```

## 🔄 Actualizar a la Última Versión

```powershell
# Detener contenedores
docker-compose -f docker-compose.prod.yml down

# Descargar últimas imágenes
docker-compose -f docker-compose.prod.yml pull

# Iniciar de nuevo
docker-compose -f docker-compose.prod.yml up -d
```

## ⚙️ Variables de Entorno (Opcional)

Puedes crear un archivo `.env` en la misma carpeta para personalizar la configuración:

```env
POSTGRES_USER=mi_usuario
POSTGRES_PASSWORD=mi_contraseña_segura
POSTGRES_DB=mi_base_datos
SECRET_KEY=mi-clave-super-secreta-de-jwt
```

## 🌐 Imágenes Docker Publicadas

Las imágenes están publicadas públicamente en Docker Hub:

- Backend: `jfuenzalida/unab-sporting-backend:latest`
- Frontend: `jfuenzalida/unab-sporting-frontend:latest`

## 🆘 Solución de Problemas

### Error: "port is already allocated"
Otro servicio está usando los puertos 8080, 8000 o 5432. Detén esos servicios o cambia los puertos en `docker-compose.prod.yml`.

### Error: "Cannot connect to database"
Espera unos segundos más. La base de datos tarda en inicializarse. Verifica con:
```powershell
docker-compose -f docker-compose.prod.yml logs db
```

### Backend no responde
Verifica los logs del backend:
```powershell
docker-compose -f docker-compose.prod.yml logs backend
```

### Reiniciar un servicio específico
```powershell
docker-compose -f docker-compose.prod.yml restart backend
```

## 📧 Soporte

Si tienes problemas, revisa los logs con `docker-compose logs` o contacta al desarrollador.

---

**Creado por**: jfuenzalida  
**Fecha**: 24 de Noviembre, 2025
