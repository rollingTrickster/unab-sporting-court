# ✅ PROYECTO DESPLEGADO EN DOCKER HUB

## 🎉 Imágenes Publicadas

Las imágenes Docker del proyecto están disponibles públicamente en Docker Hub:

### Backend (FastAPI + PostgreSQL)
```
doriajacke/unab-sporting-backend:latest
```
**Tamaño**: ~150 MB  
**Incluye**: Python 3.11, FastAPI, SQLAlchemy, Alembic, PostgreSQL driver

### Frontend (Vue.js + Nginx)
```
doriajacke/unab-sporting-frontend:latest
```
**Tamaño**: ~45 MB  
**Incluye**: Nginx Alpine, aplicación Vue.js compilada

---

## 🚀 COMANDO PARA EJECUTAR EN OTROS COMPUTADORES

### Windows PowerShell (Instalación Completa):

```powershell
mkdir unab-sporting-court; cd unab-sporting-court; Invoke-WebRequest -Uri "https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml" -OutFile "docker-compose.yml"; docker-compose up -d
```

### Linux/Mac (Instalación Completa):

```bash
mkdir unab-sporting-court && cd unab-sporting-court && curl -o docker-compose.yml https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml && docker-compose up -d
```

---

## 📦 ¿Qué hace este comando?

1. ✅ Crea un directorio para el proyecto
2. ✅ Descarga el archivo `docker-compose.yml` desde GitHub
3. ✅ Descarga automáticamente las imágenes desde Docker Hub (~200 MB total)
4. ✅ Crea y configura la base de datos PostgreSQL
5. ✅ Aplica migraciones de Alembic
6. ✅ Inicializa datos de prueba (usuarios y canchas)
7. ✅ Levanta el backend (Puerto 8000)
8. ✅ Levanta el frontend (Puerto 8080)

**⏱️ Tiempo estimado**: 3-6 minutos (dependiendo de la conexión a internet)

---

## 🌐 ACCESO A LA APLICACIÓN

Después de ejecutar el comando, espera ~30 segundos y accede a:

- **Aplicación Web**: http://localhost:8080
- **API Backend**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

---

## 👤 CREDENCIALES DE PRUEBA

### Login (usar EMAIL):
- **Administrador**: 
  - Email: `admin@unab.cl`
  - Password: `admin123`

- **Usuario Normal**: 
  - Email: `usuario@unab.cl`
  - Password: `usuario123`

### Registro de Nuevos Usuarios:
1. Click en "Registrarse"
2. Completar:
   - Nombre y Apellido
   - **RUT**: `12.345.678-9` (se formatea automáticamente)
   - **Email**: tu email único
   - **Contraseña**: mínimo 6 caracteres
3. Después del registro, **iniciar sesión con EMAIL**

---

## 🔍 VERIFICAR QUE TODO FUNCIONA

### Ver estado de contenedores:
```bash
docker-compose ps
```

Deberías ver 3 contenedores corriendo:
- ✅ `unab-sporting-db` - PostgreSQL (Estado: healthy)
- ✅ `unab-sporting-backend` - FastAPI (Estado: Up)
- ✅ `unab-sporting-frontend` - Nginx (Estado: Up)

### Ver logs en tiempo real:
```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend
```

---

## 🛠️ COMANDOS ÚTILES

### Detener servicios:
```bash
docker-compose down
```

### Reiniciar servicios:
```bash
docker-compose restart
```

### Limpiar todo (incluye datos):
```bash
docker-compose down -v
```

### Volver a levantar:
```bash
docker-compose up -d
```

---

## 📊 CARACTERÍSTICAS DEL SISTEMA

### Backend (FastAPI):
- ✅ API RESTful completa
- ✅ Autenticación JWT con tokens
- ✅ Encriptación bcrypt para contraseñas
- ✅ Base de datos PostgreSQL
- ✅ Migraciones con Alembic
- ✅ Validación de datos con Pydantic
- ✅ Documentación automática (Swagger)
- ✅ CORS configurado
- ✅ Sistema de roles (Admin/Usuario)

### Frontend (Vue.js):
- ✅ Interfaz responsive
- ✅ Autenticación de usuarios
- ✅ Registro con RUT chileno
- ✅ Login con email
- ✅ Gestión de reservas
- ✅ Calendario interactivo
- ✅ Información del clima (OpenWeather API)
- ✅ 3 deportes: Fútbol, Tenis, Pádel
- ✅ 9 canchas disponibles

### Base de Datos:
- ✅ PostgreSQL 15 Alpine
- ✅ Persistencia con volúmenes Docker
- ✅ Datos de prueba pre-cargados:
  - 2 usuarios (admin + usuario)
  - 9 canchas (3 por deporte)
  - Sistema de reservas funcional

---

## 🔐 SEGURIDAD

- 🔒 Contraseñas encriptadas con bcrypt
- 🔑 Tokens JWT con expiración (30 minutos)
- 🛡️ Validación de RUT en registro
- 🔐 Validación de email único
- 🚫 Protección contra duplicados
- ✅ CORS configurado correctamente

---

## 📁 ESTRUCTURA DEL PROYECTO

```
unab-sporting-court/
├── backend/              # API FastAPI
│   ├── alembic/         # Migraciones DB
│   ├── main.py          # Endpoints
│   ├── models.py        # Modelos SQLAlchemy
│   ├── schemas.py       # Schemas Pydantic
│   └── auth.py          # Autenticación JWT
├── src/                 # Frontend Vue.js
│   ├── components/      # Componentes Vue
│   └── services/        # Servicios API
├── docker-compose.yml   # Orquestación
├── Dockerfile           # Imagen frontend
└── nginx.conf          # Config Nginx
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Puerto 8080 ocupado:
Edita `docker-compose.yml` y cambia:
```yaml
frontend:
  ports:
    - "8081:80"  # Cambiar 8080 a 8081
```

### Servicios no inician:
```bash
docker-compose down -v
docker-compose up -d --force-recreate
```

### Ver errores del backend:
```bash
docker-compose logs backend --tail 100
```

### Acceder a la base de datos:
```bash
docker-compose exec db psql -U sporting_user -d sporting_court_db
```

---

## 📚 DOCUMENTACIÓN ADICIONAL

- 📖 **Guía de Despliegue Completa**: `DEPLOY.md`
- 🚀 **Inicio Rápido**: `QUICK-START.md`
- 🔧 **Documentación Backend**: `backend/README.md`
- 🎨 **Documentación Frontend**: `README-Vue.md`

---

## 🌐 LINKS DOCKER HUB

- Backend: https://hub.docker.com/r/doriajacke/unab-sporting-backend
- Frontend: https://hub.docker.com/r/doriajacke/unab-sporting-frontend

---

## 📞 SOPORTE

Para reportar problemas:
- GitHub Issues: https://github.com/rollingTrickster/unab-sporting-court/issues

---

## ✅ CHECKLIST DE VERIFICACIÓN

Después de la instalación, verifica:

- [ ] Los 3 contenedores están corriendo (`docker-compose ps`)
- [ ] El frontend carga en http://localhost:8080
- [ ] Puedes hacer login con `admin@unab.cl` / `admin123`
- [ ] Puedes registrar un nuevo usuario con RUT
- [ ] Puedes ver las canchas disponibles
- [ ] La documentación API está en http://localhost:8000/docs

---

**🎓 Desarrollado para Universidad Andrés Bello (UNAB)**

**Versión**: 1.0.0  
**Fecha**: Noviembre 2025  
**Licencia**: MIT
