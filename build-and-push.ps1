# Script para construir y subir imágenes a Docker Hub
# Ejecutar: .\build-and-push.ps1

Write-Host "🐳 Construyendo y subiendo imágenes a Docker Hub..." -ForegroundColor Cyan
Write-Host ""

# Configuración
$DOCKER_USERNAME = "jfuenzalida"
$BACKEND_IMAGE = "$DOCKER_USERNAME/unab-sporting-backend"
$FRONTEND_IMAGE = "$DOCKER_USERNAME/unab-sporting-frontend"
$VERSION = "latest"

# Verificar que estés logueado en Docker Hub
Write-Host "📝 Verificando login en Docker Hub..." -ForegroundColor Yellow
docker info | Select-String "Username" | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No estás logueado en Docker Hub. Por favor ejecuta:" -ForegroundColor Red
    Write-Host "   docker login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Login verificado" -ForegroundColor Green
Write-Host ""

# Construir imagen del backend
Write-Host "🔨 Construyendo imagen del backend..." -ForegroundColor Cyan
docker build -t ${BACKEND_IMAGE}:${VERSION} -f backend/Dockerfile backend/
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir imagen del backend" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Imagen del backend construida" -ForegroundColor Green
Write-Host ""

# Construir imagen del frontend
Write-Host "🔨 Construyendo imagen del frontend..." -ForegroundColor Cyan
docker build -t ${FRONTEND_IMAGE}:${VERSION} -f Dockerfile .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir imagen del frontend" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Imagen del frontend construida" -ForegroundColor Green
Write-Host ""

# Subir imagen del backend
Write-Host "⬆️  Subiendo imagen del backend a Docker Hub..." -ForegroundColor Cyan
docker push ${BACKEND_IMAGE}:${VERSION}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir imagen del backend" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Imagen del backend subida" -ForegroundColor Green
Write-Host ""

# Subir imagen del frontend
Write-Host "⬆️  Subiendo imagen del frontend a Docker Hub..." -ForegroundColor Cyan
docker push ${FRONTEND_IMAGE}:${VERSION}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir imagen del frontend" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Imagen del frontend subida" -ForegroundColor Green
Write-Host ""

# Mostrar resumen
Write-Host "🎉 ¡Imágenes publicadas exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Imágenes publicadas:" -ForegroundColor Cyan
Write-Host "   - ${BACKEND_IMAGE}:${VERSION}" -ForegroundColor White
Write-Host "   - ${FRONTEND_IMAGE}:${VERSION}" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para descargar y ejecutar en otro computador:" -ForegroundColor Cyan
Write-Host "   docker-compose -f docker-compose.prod.yml up -d" -ForegroundColor Yellow
Write-Host ""
