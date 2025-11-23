# 🏟️ Instalación Sistema de Reservas UNAB

## 📋 Requisitos Previos
- ✅ Docker instalado (versión 20.10+)
- ✅ Docker Compose instalado (versión 2.0+)
- ✅ Puertos disponibles: 8000, 8080, 5432
- ✅ 2GB de RAM disponible

---

## 🚀 Instalación en 3 Pasos

### **Paso 1: Crear carpeta del proyecto**

**Windows PowerShell:**
```powershell
mkdir unab-sporting-court
cd unab-sporting-court
```

**Linux/Mac:**
```bash
mkdir unab-sporting-court
cd unab-sporting-court
```

---

### **Paso 2: Crear archivo docker-compose.yml**

Copia y pega este contenido en un archivo llamado `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:15-alpine
    container_name: unab-sporting-db
    environment:
      POSTGRES_USER: sporting_user
      POSTGRES_PASSWORD: sporting_password
      POSTGRES_DB: sporting_court_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - sporting-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U sporting_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: doriajacke/unab-sporting-backend:latest
    container_name: unab-sporting-backend
    environment:
      DATABASE_URL: postgresql://sporting_user:sporting_password@db:5432/sporting_court_db
      SECRET_KEY: your-super-secret-key-change-in-production
      ALGORITHM: HS256
      ACCESS_TOKEN_EXPIRE_MINUTES: 30
      CORS_ORIGINS: '["http://localhost:8080","http://localhost:3000","http://127.0.0.1:8080"]'
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - sporting-network

  frontend:
    image: doriajacke/unab-sporting-frontend:latest
    container_name: unab-sporting-frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
    networks:
      - sporting-network

volumes:
  postgres_data:
    driver: local

networks:
  sporting-network:
    driver: bridge
```

**Forma rápida de crear el archivo:**

**Windows PowerShell:**
```powershell
@"
services:
  db:
    image: postgres:15-alpine
    container_name: unab-sporting-db
    environment:
      POSTGRES_USER: sporting_user
      POSTGRES_PASSWORD: sporting_password
      POSTGRES_DB: sporting_court_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - sporting-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U sporting_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: doriajacke/unab-sporting-backend:latest
    container_name: unab-sporting-backend
    environment:
      DATABASE_URL: postgresql://sporting_user:sporting_password@db:5432/sporting_court_db
      SECRET_KEY: your-super-secret-key-change-in-production
      ALGORITHM: HS256
      ACCESS_TOKEN_EXPIRE_MINUTES: 30
      CORS_ORIGINS: '[\"http://localhost:8080\",\"http://localhost:3000\",\"http://127.0.0.1:8080\"]'
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - sporting-network

  frontend:
    image: doriajacke/unab-sporting-frontend:latest
    container_name: unab-sporting-frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
    networks:
      - sporting-network

volumes:
  postgres_data:
    driver: local

networks:
  sporting-network:
    driver: bridge
"@ | Out-File -FilePath docker-compose.yml -Encoding utf8
```

---

### **Paso 3: Levantar los servicios**

```powershell
docker-compose up -d
```

⏳ **Espera 30-60 segundos** mientras:
- Se descargan las imágenes de Docker Hub (~500MB)
- Se inicializa PostgreSQL
- Se ejecutan las migraciones de base de datos
- Se cargan los datos de prueba

---

## ✅ Verificar que todo funciona

```powershell
docker-compose ps
```

**Deberías ver algo como esto:**

```
NAME                       STATUS              PORTS
unab-sporting-db           Up (healthy)        0.0.0.0:5432->5432/tcp
unab-sporting-backend      Up                  0.0.0.0:8000->8000/tcp
unab-sporting-frontend     Up                  0.0.0.0:8080->80/tcp
```

---

## 🌐 Acceder a la Aplicación

Una vez que todos los contenedores estén corriendo:

- 🌐 **Aplicación Web**: http://localhost:8080
- 🔌 **API Backend**: http://localhost:8000
- 📚 **Documentación API (Swagger)**: http://localhost:8000/docs
- 📖 **Documentación API (ReDoc)**: http://localhost:8000/redoc

---

## 👤 Credenciales de Prueba

### Usuarios Pre-configurados:

**Administrador:**
- Email: `admin@unab.cl`
- Contraseña: `admin123`

**Usuario Normal:**
- Email: `usuario@unab.cl`
- Contraseña: `usuario123`

### Registrar Nuevo Usuario:

1. Ve a http://localhost:8080
2. Click en **"Registrarse"**
3. Completa el formulario:
   - **Nombre**: Tu nombre
   - **Apellido**: Tu apellido
   - **RUT**: 12.345.678-9 (ejemplo, se formatea automáticamente)
   - **Email**: tu-email@ejemplo.com
   - **Contraseña**: mínimo 6 caracteres
4. Después del registro, **inicia sesión con tu email**

---

## 📊 Ver Logs

**Ver logs de todos los servicios:**
```powershell
docker-compose logs -f
```

**Ver logs solo del backend:**
```powershell
docker-compose logs -f backend
```

**Ver logs solo del frontend:**
```powershell
docker-compose logs -f frontend
```

**Ver logs de la base de datos:**
```powershell
docker-compose logs -f db
```

---

## 🛑 Detener los Servicios

**Detener sin eliminar datos:**
```powershell
docker-compose down
```

**Detener y eliminar TODOS los datos (limpieza completa):**
```powershell
docker-compose down -v
```

---

## 🔄 Actualizar a la Última Versión

```powershell
docker-compose pull
docker-compose up -d
```

---

## 🔧 Solución de Problemas

### ❌ Puerto 8080 ya está en uso

Edita `docker-compose.yml` y cambia el puerto del frontend:

```yaml
frontend:
  ports:
    - "8081:80"  # Cambia de 8080 a 8081
```

Luego reinicia:
```powershell
docker-compose down
docker-compose up -d
```

### ❌ Puerto 8000 ya está en uso

Edita `docker-compose.yml` y cambia el puerto del backend:

```yaml
backend:
  ports:
    - "8001:8000"  # Cambia de 8000 a 8001
```

### ❌ Los servicios no inician correctamente

Limpia todo y vuelve a empezar:

```powershell
docker-compose down -v
docker-compose up -d --force-recreate
```

### ❌ Error de conexión a la base de datos

Verifica que la base de datos esté healthy:

```powershell
docker-compose ps
```

Si no está "healthy", revisa los logs:

```powershell
docker-compose logs db
```

---

## 🗄️ Acceder a la Base de Datos

**Conectar a PostgreSQL:**
```powershell
docker-compose exec db psql -U sporting_user -d sporting_court_db
```

**Ver usuarios:**
```sql
SELECT id, email, rut, full_name, is_admin FROM users;
```

**Ver canchas:**
```sql
SELECT * FROM courts;
```

**Ver reservas:**
```sql
SELECT * FROM reservations;
```

**Salir de psql:**
```sql
\q
```

---

## 📦 Contenido del Sistema

### Base de Datos Incluye:

- ✅ **2 Usuarios de prueba** (admin y usuario normal)
- ✅ **9 Canchas deportivas**:
  - 3 de Fútbol
  - 3 de Tenis
  - 3 de Pádel
- ✅ Sistema completo de autenticación JWT
- ✅ Validación de disponibilidad de horarios

### Funcionalidades:

- 🔐 Registro e inicio de sesión con RUT/Email
- 🏟️ Visualización de canchas por deporte
- 📅 Sistema de reservas con calendario
- ⏰ Validación de disponibilidad de horarios
- ✏️ Modificar y cancelar reservas
- 👤 Perfiles de usuario
- 🔒 Roles (Admin y Usuario)

---

## 📖 API Endpoints Principales

Visita http://localhost:8000/docs para la documentación completa interactiva.

### Autenticación:
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login/json` - Iniciar sesión

### Canchas:
- `GET /api/v1/courts` - Listar todas las canchas
- `GET /api/v1/courts/{id}` - Obtener cancha por ID
- `GET /api/v1/courts/{id}/availability` - Ver disponibilidad

### Reservas:
- `POST /api/v1/reservations` - Crear reserva
- `GET /api/v1/reservations` - Mis reservas
- `GET /api/v1/reservations/{id}` - Detalle de reserva
- `PUT /api/v1/reservations/{id}` - Modificar reserva
- `DELETE /api/v1/reservations/{id}` - Cancelar reserva

---

## 🔐 Seguridad en Producción

**⚠️ IMPORTANTE**: Si vas a usar esto en producción:

1. **Cambia el SECRET_KEY** en `docker-compose.yml`:
   ```yaml
   SECRET_KEY: "tu-clave-super-secreta-aleatoria-de-al-menos-32-caracteres"
   ```

2. **Cambia la contraseña de PostgreSQL**:
   ```yaml
   POSTGRES_PASSWORD: "una-contraseña-muy-segura"
   ```

3. **Actualiza CORS_ORIGINS** con tu dominio real:
   ```yaml
   CORS_ORIGINS: '["https://tu-dominio.com"]'
   ```

4. **Usa HTTPS** con un reverse proxy (Nginx/Traefik)

---

## 💡 Consejos

- 📌 Los datos se guardan en un volumen Docker, **no se pierden** al reiniciar
- 🔄 Para actualizar, solo ejecuta `docker-compose pull && docker-compose up -d`
- 🗑️ Para limpiar todo: `docker-compose down -v`
- 📝 Los logs ayudan a debuggear: `docker-compose logs -f`

---

## 📞 Soporte

**Imágenes Docker Hub:**
- Backend: https://hub.docker.com/r/doriajacke/unab-sporting-backend
- Frontend: https://hub.docker.com/r/doriajacke/unab-sporting-frontend

**Repositorio GitHub:**
- https://github.com/rollingTrickster/unab-sporting-court

---

## ✅ Checklist de Instalación

- [ ] Docker y Docker Compose instalados
- [ ] Carpeta `unab-sporting-court` creada
- [ ] Archivo `docker-compose.yml` creado
- [ ] Ejecutado `docker-compose up -d`
- [ ] Esperado 30-60 segundos
- [ ] Verificado con `docker-compose ps`
- [ ] Abierto http://localhost:8080 en el navegador
- [ ] Probado login con credenciales de prueba

---

**🎉 ¡Listo! Tu sistema de reservas está funcionando.**

Para cualquier problema, revisa los logs con `docker-compose logs -f`
