#!/bin/bash

echo "🚀 Iniciando la aplicación de Notas..."

# Primero, detengo todo lo que pudiera estar corriendo de antes para evitar errores.
echo "▶ Deteniendo servicios anteriores (si existen)..."
docker-compose down

# Ahora sí, levanto todo de nuevo.
# --build le dice que reconstruya la imagen por si hice cambios en el código.
# -d (detached) es para que corra en segundo plano y no me bloquee la terminal.
echo "▶ Construyendo y levantando los servicios..."
docker-compose up --build -d

echo ""
echo "✅ ¡Aplicación lista!"
echo "Backend disponible en: http://localhost:3000"