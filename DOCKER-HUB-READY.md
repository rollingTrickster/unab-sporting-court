# ✅ Proyecto Listo para Docker Hub

## 🎉 Despliegue Completado

El proyecto **UNAB Sporting Court** ha sido exitosamente desplegado en Docker Hub y está listo para ser instalado en cualquier computador.

---

## 📦 Imágenes Publicadas

Las siguientes imágenes están disponibles públicamente en Docker Hub:

- **Backend:** `doriajacke/unab-sporting-backend:latest`
- **Frontend:** `doriajacke/unab-sporting-frontend:latest`

---

## 🚀 Instalación Rápida (Un Solo Comando)

### Windows PowerShell:
```powershell
mkdir unab-sporting-court; cd unab-sporting-court; @"
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
"@ | Out-File -FilePath docker-compose.yml -Encoding utf8; docker-compose up -d
```

### Linux/Mac:
```bash
mkdir unab-sporting-court && cd unab-sporting-court && cat > docker-compose.yml << 'EOF'
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
EOF
docker-compose up -d
```

---

## 📖 Acceso al Sistema

Una vez iniciado el sistema (esperar ~15 segundos), accede a:

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs

---

## 👤 Credenciales de Prueba

El sistema crea automáticamente dos usuarios:

| Rol | Email | Contraseña |
|-----|-------|-----------|
| **Administrador** | `admin@unab.cl` | `admin123` |
| **Usuario** | `usuario@unab.cl` | `usuario123` |

---

## ✅ Verificación de la Instalación

Ejecuta estos comandos para verificar que todo funciona:

```powershell
# Ver el estado de los contenedores
docker-compose ps

# Verificar logs del backend
docker-compose logs backend --tail 20

# Verificar que el backend responde
Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing

# Verificar usuarios en la base de datos
docker-compose exec -T db psql -U sporting_user -d sporting_court_db -c "SELECT email, full_name FROM users;"
```

---

## 🔧 Comandos Útiles

```powershell
# Detener el sistema
docker-compose down

# Detener y eliminar datos (reset completo)
docker-compose down -v

# Reiniciar el sistema
docker-compose restart

# Ver logs en tiempo real
docker-compose logs -f

# Actualizar a la última versión
docker-compose pull
docker-compose up -d
```

---

## 📦 Características Implementadas

- ✅ **Autenticación con RUT:** Los usuarios se registran con RUT chileno
- ✅ **Login con Email:** Los usuarios inician sesión con email
- ✅ **JWT Tokens:** Autenticación segura con tokens
- ✅ **Base de datos PostgreSQL:** Persistencia de datos
- ✅ **API RESTful:** Backend FastAPI con documentación automática
- ✅ **Frontend Vue.js:** Interfaz moderna y responsive
- ✅ **Docker Hub Ready:** Fácil instalación en cualquier computador

---

## 🏗️ Arquitectura

```
┌─────────────────────┐
│  Frontend (Nginx)   │
│  Port: 8080         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Backend (FastAPI)  │
│  Port: 8000         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Database (PG)      │
│  Port: 5432         │
└─────────────────────┘
```

---

## 📚 Documentos Adicionales

- **INSTRUCCIONES-INSTALACION.md:** Guía detallada de instalación paso a paso
- **DEPLOY.md:** Información sobre el proceso de deployment
- **QUICK-START.md:** Guía rápida para comenzar

---

## 🔐 Seguridad en Producción

Para usar en producción, cambia estas variables de entorno:

```yaml
environment:
  SECRET_KEY: "cambia-este-secreto-por-uno-aleatorio-largo-y-seguro"
  POSTGRES_PASSWORD: "cambia-esta-contraseña"
```

---

## 🐛 Troubleshooting

### Problema: Puertos en uso
```powershell
# Ver qué está usando el puerto 8080
netstat -ano | findstr :8080

# Ver qué está usando el puerto 8000
netstat -ano | findstr :8000
```

### Problema: Contenedor no inicia
```powershell
# Ver logs completos
docker-compose logs backend

# Reiniciar desde cero
docker-compose down -v
docker-compose up -d
```

### Problema: No se conecta a la base de datos
```powershell
# Verificar que el contenedor de DB esté healthy
docker-compose ps

# Ver logs de la base de datos
docker-compose logs db
```

---

## ✨ Próximos Pasos

1. Personalizar credenciales de producción
2. Configurar un dominio personalizado
3. Implementar backup automático de la base de datos
4. Agregar monitoreo con Prometheus/Grafana
5. Implementar CI/CD con GitHub Actions

---

## 📧 Soporte

Para más información o problemas, consulta los documentos en la carpeta del proyecto o revisa los logs con:

```powershell
docker-compose logs -f
```

---

**¡Listo para usar! 🎉**
