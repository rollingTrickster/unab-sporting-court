# ✅ Despliegue Completado - UNAB Sporting Court

## 🎉 Resumen

Las imágenes Docker han sido creadas y publicadas exitosamente en Docker Hub bajo la cuenta **jfuenzalida**.

## 📦 Imágenes Publicadas

- **Backend**: `jfuenzalida/unab-sporting-backend:latest`
  - FastAPI + PostgreSQL
  - Puerto: 8000
  - Tamaño: ~594MB

- **Frontend**: `jfuenzalida/unab-sporting-frontend:latest`
  - Nginx + Vue.js
  - Puerto: 8080
  - Tamaño: ~47MB

## 🚀 Cómo Desplegar en Otro PC

### Opción 1: Script Automático (Recomendado)

1. Copia el archivo `docker-compose.prod.yml` y `deploy.ps1` al nuevo PC
2. Ejecuta en PowerShell:
```powershell
.\deploy.ps1
```

### Opción 2: Manual

1. Copia solo el archivo `docker-compose.prod.yml` al nuevo PC
2. Ejecuta:
```powershell
docker-compose -f docker-compose.prod.yml up -d
```

## 🌐 Acceso a la Aplicación

Una vez desplegado, accede a:

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## 👤 Credenciales de Prueba

El sistema viene pre-configurado con usuarios de prueba:

- **Administrador**:
  - Email: `admin@unab.cl`
  - Contraseña: `admin123`

- **Usuario Regular**:
  - Email: `usuario@unab.cl`
  - Contraseña: `usuario123`

## 📊 Comandos Útiles

### Ver estado de los contenedores
```powershell
docker ps
```

### Ver logs en tiempo real
```powershell
docker-compose -f docker-compose.prod.yml logs -f
```

### Ver logs de un servicio específico
```powershell
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

### Detener la aplicación
```powershell
docker-compose -f docker-compose.prod.yml down
```

### Eliminar TODO (incluidos datos)
```powershell
docker-compose -f docker-compose.prod.yml down -v
```

### Reiniciar un servicio
```powershell
docker-compose -f docker-compose.prod.yml restart backend
```

### Actualizar a la última versión
```powershell
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────┐
│         Docker Compose Networking               │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────┐│
│  │  Frontend    │  │   Backend    │  │   DB   ││
│  │   (Nginx)    │←→│  (FastAPI)   │←→│ (Postgres)││
│  │  Port 8080   │  │  Port 8000   │  │Port 5432││
│  └──────────────┘  └──────────────┘  └────────┘│
│         ↑                                       │
└─────────│───────────────────────────────────────┘
          │
    Usuario (Navegador)
```

## 📋 Requisitos del Sistema

### En el PC Donde Vas a Desplegar:

- **Sistema Operativo**: Windows 10/11, macOS, o Linux
- **Docker Desktop** (Windows/Mac) o **Docker Engine** (Linux)
- **RAM**: Mínimo 4GB (Recomendado 8GB)
- **Espacio en Disco**: ~2GB para las imágenes y datos

### Puertos Requeridos (Deben estar Libres):

- `8080` - Frontend
- `8000` - Backend
- `5432` - PostgreSQL (solo internamente)

## 🔒 Seguridad

### Para Producción, Cambia:

1. Las contraseñas de la base de datos (en `.env` o docker-compose.prod.yml)
2. El `SECRET_KEY` para JWT
3. Las credenciales de los usuarios de prueba

## 🆘 Solución de Problemas

### Error: "port is already allocated"
Otro servicio está usando los puertos. Detén esos servicios o cambia los puertos en `docker-compose.prod.yml`.

### Error: "Cannot connect to database"
La base de datos tarda unos segundos en inicializarse. Espera 10-15 segundos y verifica con:
```powershell
docker-compose -f docker-compose.prod.yml logs db
```

### Backend no responde
Verifica los logs:
```powershell
docker-compose -f docker-compose.prod.yml logs backend
```

### Frontend muestra "Connection Error"
El backend podría no estar listo. Verifica que el backend esté corriendo:
```powershell
curl http://localhost:8000/docs
```

## 📁 Archivos Necesarios para Despliegue

Para desplegar en otro PC, solo necesitas:

1. `docker-compose.prod.yml` (obligatorio)
2. `deploy.ps1` (opcional, pero recomendado)
3. `.env` (opcional, para configuración personalizada)

**NO necesitas** el código fuente ni ningún otro archivo.

## 🔄 Proceso de Actualización

Cuando hagas cambios al código:

1. Reconstruye las imágenes localmente:
```powershell
.\build-and-push.ps1
```

2. En otros PCs, actualiza con:
```powershell
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 📞 Enlaces Útiles

- **Docker Hub Backend**: https://hub.docker.com/r/jfuenzalida/unab-sporting-backend
- **Docker Hub Frontend**: https://hub.docker.com/r/jfuenzalida/unab-sporting-frontend
- **Repositorio GitHub**: https://github.com/rollingTrickster/unab-sporting-court

## ✅ Checklist de Despliegue

- [x] Imágenes construidas
- [x] Imágenes publicadas en Docker Hub
- [x] Docker Compose configurado
- [x] Base de datos inicializada automáticamente
- [x] Usuarios de prueba creados
- [x] Scripts de despliegue creados
- [x] Documentación completa

---

**Creado por**: jfuenzalida  
**Fecha**: 24 de Noviembre, 2025  
**Versión**: 1.0.0
