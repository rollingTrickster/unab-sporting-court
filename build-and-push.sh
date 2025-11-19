#!/bin/bash
# Script para construir y subir imágenes a Docker Hub
# Ejecutar: chmod +x build-and-push.sh && ./build-and-push.sh

echo "🐳 Construyendo y subiendo imágenes a Docker Hub..."
echo ""

# Configuración
DOCKER_USERNAME="doriajacke"
BACKEND_IMAGE="$DOCKER_USERNAME/unab-sporting-backend"
FRONTEND_IMAGE="$DOCKER_USERNAME/unab-sporting-frontend"
VERSION="latest"

# Verificar que estés logueado en Docker Hub
echo "📝 Verificando login en Docker Hub..."
docker info | grep Username > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "⚠️  No estás logueado en Docker Hub. Por favor ejecuta:"
    echo "   docker login"
    exit 1
fi

echo "✅ Login verificado"
echo ""

# Construir imagen del backend
echo "🔨 Construyendo imagen del backend..."
docker build -t ${BACKEND_IMAGE}:${VERSION} -f backend/Dockerfile backend/
if [ $? -ne 0 ]; then
    echo "❌ Error al construir imagen del backend"
    exit 1
fi
echo "✅ Imagen del backend construida"
echo ""

# Construir imagen del frontend
echo "🔨 Construyendo imagen del frontend..."
docker build -t ${FRONTEND_IMAGE}:${VERSION} -f Dockerfile .
if [ $? -ne 0 ]; then
    echo "❌ Error al construir imagen del frontend"
    exit 1
fi
echo "✅ Imagen del frontend construida"
echo ""

# Subir imagen del backend
echo "⬆️  Subiendo imagen del backend a Docker Hub..."
docker push ${BACKEND_IMAGE}:${VERSION}
if [ $? -ne 0 ]; then
    echo "❌ Error al subir imagen del backend"
    exit 1
fi
echo "✅ Imagen del backend subida"
echo ""

# Subir imagen del frontend
echo "⬆️  Subiendo imagen del frontend a Docker Hub..."
docker push ${FRONTEND_IMAGE}:${VERSION}
if [ $? -ne 0 ]; then
    echo "❌ Error al subir imagen del frontend"
    exit 1
fi
echo "✅ Imagen del frontend subida"
echo ""

# Mostrar resumen
echo "🎉 ¡Imágenes publicadas exitosamente!"
echo ""
echo "📦 Imágenes publicadas:"
echo "   - ${BACKEND_IMAGE}:${VERSION}"
echo "   - ${FRONTEND_IMAGE}:${VERSION}"
echo ""
echo "🚀 Para descargar y ejecutar en otro computador:"
echo "   docker-compose -f docker-compose.prod.yml up -d"
echo ""
