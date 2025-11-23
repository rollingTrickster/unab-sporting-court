#!/bin/bash

echo "🚀 Iniciando aplicación..."

# Esperar a que la base de datos esté lista
echo "⏳ Esperando a que la base de datos esté lista..."
sleep 5

# Aplicar migraciones
echo "📦 Aplicando migraciones..."
alembic upgrade head

# Inicializar datos
echo "🌱 Inicializando datos..."
python init_db.py

# Iniciar servidor
echo "✅ Iniciando servidor FastAPI..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
