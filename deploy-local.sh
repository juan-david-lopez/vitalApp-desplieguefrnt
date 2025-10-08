#!/bin/bash

# VitalApp - Script de Despliegue Local con Docker
# Este script construye y ejecuta la aplicación en un contenedor Docker

set -e

echo "🏥 VitalApp - Despliegue Local con Docker"
echo "=========================================="

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instala Docker Desktop."
    exit 1
fi

# Verificar si el archivo .env existe
if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado"
    echo "📝 Creando .env desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado. Por favor, configura tus variables de entorno."
    exit 1
fi

echo ""
echo "📦 Cargando variables de entorno..."
source .env

echo "🔨 Construyendo imagen Docker..."
docker build \
  --build-arg VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
  --build-arg VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID \
  -t vitalapp:latest .

echo ""
echo "🚀 Iniciando contenedor..."
docker run -d \
  -p 3000:80 \
  --name vitalapp-container \
  --restart unless-stopped \
  vitalapp:latest

echo ""
echo "✅ ¡Despliegue completado!"
echo "🌐 La aplicación está disponible en: http://localhost:3000"
echo ""
echo "📊 Comandos útiles:"
echo "  - Ver logs:      docker logs -f vitalapp-container"
echo "  - Detener:       docker stop vitalapp-container"
echo "  - Eliminar:      docker rm vitalapp-container"
echo "  - Reiniciar:     docker restart vitalapp-container"
