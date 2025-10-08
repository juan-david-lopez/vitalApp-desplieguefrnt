# VitalApp - Script de Despliegue Local con Docker (Windows)
# Este script construye y ejecuta la aplicación en un contenedor Docker

Write-Host "🏥 VitalApp - Despliegue Local con Docker" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Verificar si Docker está instalado
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker no está instalado. Por favor, instala Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar si el archivo .env existe
if (!(Test-Path .env)) {
    Write-Host "⚠️  Archivo .env no encontrado" -ForegroundColor Yellow
    Write-Host "📝 Creando .env desde .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ Archivo .env creado. Por favor, configura tus variables de entorno." -ForegroundColor Green
    exit 1
}

Write-Host ""
Write-Host "📦 Cargando variables de entorno..." -ForegroundColor Yellow

# Leer variables del archivo .env
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        $name = $matches[1].Trim('"')
        $value = $matches[2].Trim('"')
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}

$VITE_SUPABASE_URL = $env:VITE_SUPABASE_URL
$VITE_SUPABASE_PUBLISHABLE_KEY = $env:VITE_SUPABASE_PUBLISHABLE_KEY
$VITE_SUPABASE_PROJECT_ID = $env:VITE_SUPABASE_PROJECT_ID

Write-Host "🔨 Construyendo imagen Docker..." -ForegroundColor Yellow
docker build `
  --build-arg VITE_SUPABASE_URL=$VITE_SUPABASE_URL `
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY `
  --build-arg VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID `
  -t vitalapp:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir la imagen Docker" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🧹 Limpiando contenedor anterior si existe..." -ForegroundColor Yellow
docker stop vitalapp-container 2>$null
docker rm vitalapp-container 2>$null

Write-Host "🚀 Iniciando contenedor..." -ForegroundColor Yellow
docker run -d `
  -p 3000:80 `
  --name vitalapp-container `
  --restart unless-stopped `
  vitalapp:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al iniciar el contenedor" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host "🌐 La aplicación está disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Comandos útiles:" -ForegroundColor Yellow
Write-Host "  - Ver logs:      docker logs -f vitalapp-container"
Write-Host "  - Detener:       docker stop vitalapp-container"
Write-Host "  - Eliminar:      docker rm vitalapp-container"
Write-Host "  - Reiniciar:     docker restart vitalapp-container"
