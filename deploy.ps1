# 🚀 Script de Despliegue Rápido - UNAB Sporting Court
# Usa este script para desplegar la aplicación en cualquier PC con Docker

Write-Host "🚀 Desplegando UNAB Sporting Court..." -ForegroundColor Cyan
Write-Host ""

# Verificar que Docker esté instalado
Write-Host "📦 Verificando Docker..." -ForegroundColor Yellow
docker --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker no está instalado o no está en PATH" -ForegroundColor Red
    Write-Host "   Por favor instala Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Docker encontrado" -ForegroundColor Green
Write-Host ""

# Descargar última versión de las imágenes
Write-Host "📥 Descargando imágenes desde Docker Hub..." -ForegroundColor Yellow
docker-compose -f docker-compose.prod.yml pull
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al descargar imágenes" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Imágenes descargadas" -ForegroundColor Green
Write-Host ""

# Iniciar contenedores
Write-Host "🐳 Iniciando contenedores..." -ForegroundColor Yellow
docker-compose -f docker-compose.prod.yml up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al iniciar contenedores" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Contenedores iniciados" -ForegroundColor Green
Write-Host ""

# Esperar a que los servicios estén listos
Write-Host "⏳ Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 15
Write-Host "✅ Servicios listos" -ForegroundColor Green
Write-Host ""

# Mostrar resumen
Write-Host "🎉 ¡Despliegue completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Información de acceso:" -ForegroundColor Cyan
Write-Host "   Frontend:  http://localhost:8080" -ForegroundColor White
Write-Host "   Backend API: http://localhost:8000" -ForegroundColor White
Write-Host "   API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "👤 Credenciales de prueba:" -ForegroundColor Cyan
Write-Host "   Admin: admin@unab.cl / admin123" -ForegroundColor White
Write-Host "   Usuario: usuario@unab.cl / usuario123" -ForegroundColor White
Write-Host ""
Write-Host "📊 Para ver logs:" -ForegroundColor Cyan
Write-Host "   docker-compose -f docker-compose.prod.yml logs -f" -ForegroundColor Yellow
Write-Host ""
Write-Host "🛑 Para detener:" -ForegroundColor Cyan
Write-Host "   docker-compose -f docker-compose.prod.yml down" -ForegroundColor Yellow
Write-Host ""

# Abrir navegador (opcional)
$response = Read-Host "¿Deseas abrir la aplicación en el navegador? (S/n)"
if ($response -eq "" -or $response -eq "S" -or $response -eq "s") {
    Start-Process "http://localhost:8080"
}
