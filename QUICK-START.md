# 🚀 Instalación Rápida - Sistema de Reserva de Canchas UNAB

## Comando de Instalación en Un Solo Paso

### Windows PowerShell:
```powershell
mkdir unab-sporting-court; cd unab-sporting-court; Invoke-WebRequest -Uri "https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml" -OutFile "docker-compose.yml"; docker-compose up -d
```

### Linux/Mac:
```bash
mkdir unab-sporting-court && cd unab-sporting-court && curl -o docker-compose.yml https://raw.githubusercontent.com/rollingTrickster/unab-sporting-court/CopiaConDockers/docker-compose.prod.yml && docker-compose up -d
```

## ⏳ Tiempo de instalación

- Descarga de imágenes: ~2-5 minutos (dependiendo de tu conexión)
- Inicialización de servicios: ~30 segundos
- **Total**: ~3-6 minutos

## 🌐 Acceso

Una vez completada la instalación:

- **Aplicación Web**: http://localhost:8080
- **API Backend**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## 👤 Credenciales de Prueba

**Login con email:**
- Admin: `admin@unab.cl` / `admin123`
- Usuario: `usuario@unab.cl` / `usuario123`

**Para registrar nuevo usuario:**
- Ve a http://localhost:8080
- Click en "Registrarse"
- Completa: Nombre, Apellido, RUT (12.345.678-9), Email, Contraseña
- Luego inicia sesión con tu **email**

## 🔍 Verificar Estado

```bash
docker-compose ps
```

Deberías ver 3 contenedores corriendo:
- ✅ unab-sporting-db (healthy)
- ✅ unab-sporting-backend (up)
- ✅ unab-sporting-frontend (up)

## 📋 Ver Logs

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend
```

## 🛑 Detener Servicios

```bash
docker-compose down
```

## 🗑️ Limpiar Todo (incluye datos)

```bash
docker-compose down -v
```

## 📦 Imágenes Docker Hub

Las imágenes están publicadas en Docker Hub:
- Backend: `doriajacke/unab-sporting-backend:latest`
- Frontend: `doriajacke/unab-sporting-frontend:latest`

## 📚 Documentación Completa

Para más detalles, consulta `DEPLOY.md`

## ⚙️ Requisitos del Sistema

- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM disponible
- Puertos libres: 8000, 8080, 5432

## 🆘 Problemas Comunes

### Puerto ya en uso
Si el puerto 8080 está ocupado, edita `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "8081:80"  # Cambia 8080 a 8081
```

### Servicios no inician
```bash
docker-compose down -v
docker-compose up -d --force-recreate
```

---

**¿Necesitas ayuda?** Revisa los logs: `docker-compose logs -f`
