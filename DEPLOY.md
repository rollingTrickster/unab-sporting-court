# 🚀 Guía de Despliegue - Sistema de Reserva de Canchas UNAB

## 📋 Requisitos Previos

- Docker instalado (versión 20.10 o superior)
- Docker Compose instalado (versión 2.0 o superior)
- 2GB de RAM disponible
- Puertos disponibles: 8000 (backend), 8080 (frontend), 5432 (postgres)

## 🐳 Instalación Rápida con Docker Hub

### Opción 1: Instalación Automática (Un solo comando)

```bash
# Windows PowerShell
curl -o docker-compose.yml https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml; docker-compose up -d

# Linux/Mac
curl -o docker-compose.yml https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml && docker-compose up -d
```

### Opción 2: Instalación Manual

#### 1. Crear directorio del proyecto

#### 1. Crear directorio del proyecto

```bash
mkdir unab-sporting-court
cd unab-sporting-court
```

#### 2. Descargar docker-compose.yml

```bash
# Windows PowerShell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml" -OutFile "docker-compose.yml"

# Linux/Mac
curl -o docker-compose.yml https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml
```

#### 3. (Opcional) Configurar variables de entorno

#### 3. (Opcional) Configurar variables de entorno

Crea un archivo `.env` (opcional, usa valores por defecto si no lo creas):

```bash
# Windows PowerShell
@"
POSTGRES_PASSWORD=tu-contraseña-segura
SECRET_KEY=tu-clave-secreta-muy-larga-y-aleatoria
"@ | Out-File -FilePath .env -Encoding utf8

# Linux/Mac
cat > .env << EOF
POSTGRES_PASSWORD=tu-contraseña-segura
SECRET_KEY=tu-clave-secreta-muy-larga-y-aleatoria
EOF
```

#### 4. Levantar los servicios

#### 4. Levantar los servicios

```bash
docker-compose up -d
```

#### 5. Verificar que todo esté funcionando

#### 5. Verificar que todo esté funcionando

```bash
docker-compose ps
```

Espera 30 segundos aproximadamente para que todos los servicios inicien.

Deberías ver 3 contenedores en estado "Up":
- `unab-sporting-db` (PostgreSQL) - Estado: healthy
- `unab-sporting-backend` (FastAPI) - Estado: Up
- `unab-sporting-frontend` (Nginx) - Estado: Up

#### 6. Acceder a la aplicación

- **Frontend**: http://localhost:8080
- **API Backend**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## 👤 Credenciales de Prueba

### Usuarios pre-configurados:

**Administrador:**
- Email: `admin@unab.cl`
- Contraseña: `admin123`

**Usuario normal:**
- Email: `usuario@unab.cl`
- Contraseña: `usuario123`

### Registrar nuevo usuario:

1. Ve a http://localhost:8080
2. Click en "Registrarse"
3. Completa:
   - Nombre y Apellido
   - RUT (ejemplo: 12.345.678-9)
   - Email único
   - Contraseña (mínimo 6 caracteres)
4. Después del registro, inicia sesión con tu **email**

## 🛠️ Comandos Útiles

### Ver logs de los servicios

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend

# Solo base de datos
docker-compose logs -f db
```

### Reiniciar servicios

```bash
# Todos los servicios
docker-compose restart

# Solo un servicio
docker-compose restart backend
```

### Detener servicios

```bash
docker-compose down
```

### Detener y eliminar volúmenes (limpieza completa)

```bash
docker-compose down -v
```

### Reconstruir imágenes

```bash
docker-compose up -d --build
```

### Acceder a la base de datos

```bash
# Conectar a PostgreSQL
docker-compose exec db psql -U sporting_user -d sporting_court_db

# Ver usuarios
docker-compose exec db psql -U sporting_user -d sporting_court_db -c "SELECT id, email, rut, full_name FROM users;"

# Ver canchas
docker-compose exec db psql -U sporting_user -d sporting_court_db -c "SELECT * FROM courts;"

# Ver reservas
docker-compose exec db psql -U sporting_user -d sporting_court_db -c "SELECT * FROM reservations;"
```

## 🔧 Solución de Problemas

### El puerto 8080 ya está en uso

Edita `docker-compose.yml` y cambia el puerto del frontend:

```yaml
frontend:
  ports:
    - "8081:80"  # Cambia 8080 a 8081
```

### El backend no se conecta a la base de datos

```bash
# Verificar que la base de datos esté healthy
docker-compose ps

# Si no está healthy, revisar logs
docker-compose logs db

# Reiniciar servicios
docker-compose restart
```

### Limpiar y empezar de cero

```bash
docker-compose down -v
docker-compose up -d --build
```

### Ver errores del backend

```bash
docker-compose logs backend --tail 100
```

## 📦 Estructura del Proyecto

```
unab-sporting-court/
├── backend/              # API FastAPI
│   ├── alembic/         # Migraciones de base de datos
│   ├── main.py          # Punto de entrada de la API
│   ├── models.py        # Modelos SQLAlchemy
│   ├── schemas.py       # Schemas Pydantic
│   ├── auth.py          # Autenticación JWT
│   └── requirements.txt # Dependencias Python
├── src/                 # Frontend Vue.js
│   ├── components/      # Componentes Vue
│   └── services/        # Servicios API
├── docs/                # Documentación
├── docker-compose.yml   # Orquestación de servicios
├── Dockerfile           # Imagen del frontend
├── nginx.conf           # Configuración Nginx
└── .env.example         # Variables de entorno de ejemplo
```

## 🔐 Seguridad en Producción

**IMPORTANTE**: Antes de desplegar en producción:

1. Cambia el `SECRET_KEY` en `.env`:
   ```
   SECRET_KEY=tu-clave-super-secreta-aleatoria-de-al-menos-32-caracteres
   ```

2. Cambia las contraseñas de la base de datos:
   ```
   POSTGRES_PASSWORD=una-contraseña-muy-segura
   ```

3. Actualiza `CORS_ORIGINS` con tu dominio real:
   ```
   CORS_ORIGINS=["https://tu-dominio.com"]
   ```

4. Usa HTTPS en producción (configura un reverse proxy como Nginx o Traefik)

## 📊 Base de Datos

La base de datos incluye:
- ✅ 2 usuarios de prueba (admin y usuario normal)
- ✅ 9 canchas (3 de fútbol, 3 de tenis, 3 de pádel)
- ✅ Sistema de autenticación JWT
- ✅ Gestión de reservas con validación de disponibilidad

## 🌐 API Endpoints

Documentación interactiva disponible en: http://localhost:8000/docs

Principales endpoints:
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login/json` - Iniciar sesión
- `GET /api/v1/courts` - Listar canchas
- `POST /api/v1/reservations` - Crear reserva
- `GET /api/v1/reservations` - Mis reservas
- `DELETE /api/v1/reservations/{id}` - Cancelar reserva

## 📞 Soporte

Para reportar problemas o solicitar ayuda:
- GitHub Issues: https://github.com/rollingTrickster/unab-sporting-court/issues
- Email: soporte@ejemplo.com

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

**Desarrollado para UNAB** 🎓
