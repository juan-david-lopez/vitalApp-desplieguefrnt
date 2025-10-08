# 🏥 VitalApp - Sistema de Gestión de Salud Digital

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/VitalApp/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/YOUR_USERNAME/VitalApp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**VitalApp** es una aplicación web moderna diseñada para la **Clínica Salud Vital**, que permite a los pacientes gestionar sus citas médicas, consultar resultados de laboratorio y recibir alertas de salud personalizadas.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Instalación Local](#-instalación-local)
- [Despliegue con Docker](#-despliegue-con-docker)
- [CI/CD con GitHub Actions](#-cicd-con-github-actions)
- [Despliegue en Producción](#-despliegue-en-producción)
- [Variables de Entorno](#-variables-de-entorno)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Contribuir](#-contribuir)

## ✨ Características

- 🔐 **Autenticación segura** con Supabase Auth
- 📅 **Gestión de citas médicas** (crear, ver, modificar)
- 🔬 **Consulta de resultados** de laboratorio y estudios
- 🔔 **Alertas de salud** personalizadas con niveles de prioridad
- 📊 **Dashboard interactivo** con estadísticas en tiempo real
- 🎨 **UI/UX moderna** con Tailwind CSS y Shadcn/ui
- 📱 **Responsive design** para todos los dispositivos
- 🔒 **Row-Level Security (RLS)** en la base de datos

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación SPA
- **TanStack Query** - Manejo de estado del servidor
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes UI accesibles
- **Radix UI** - Primitivas UI sin estilo
- **Zod** - Validación de esquemas

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication
  - Row Level Security
  - Real-time subscriptions

### DevOps
- **Docker** - Containerización
- **GitHub Actions** - CI/CD
- **Nginx** - Web server en producción
- **Vercel/Netlify** - Hosting

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    VitalApp Frontend                     │
│  (React + TypeScript + Vite + Tailwind + Shadcn/ui)    │
└───────────────────┬─────────────────────────────────────┘
                    │
                    │ HTTPS/REST API
                    │
┌───────────────────▼─────────────────────────────────────┐
│                  Supabase Backend                        │
├──────────────────────────────────────────────────────────┤
│  • Authentication (JWT)                                  │
│  • PostgreSQL Database                                   │
│  • Row-Level Security (RLS)                             │
│  • Real-time Subscriptions                              │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                   CI/CD Pipeline                         │
├──────────────────────────────────────────────────────────┤
│  GitHub → Actions → Build → Test → Docker → Deploy      │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Instalación Local

### Prerrequisitos

- **Node.js** >= 20.x
- **npm** o **yarn**
- Cuenta de **Supabase** (para la base de datos)

### Pasos de instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/YOUR_USERNAME/VitalApp.git
cd VitalApp
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar variables de entorno**

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tus credenciales de Supabase
```

Contenido del `.env`:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=tu_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=tu_project_id
```

**4. Configurar la base de datos en Supabase**

- Ve a tu proyecto en [Supabase](https://supabase.com)
- En el **SQL Editor**, ejecuta el script de migración: `supabase/migrations/20251001194525_d6323d00-7215-4f36-883d-0228f248770c.sql`
- Esto creará las tablas: `profiles`, `appointments`, `medical_results`, `health_alerts`

**5. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:8080**

## 🐳 Despliegue con Docker

### Opción 1: Docker Run Manual

```bash
# Construir la imagen
docker build \
  --build-arg VITE_SUPABASE_URL=tu_url \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=tu_key \
  --build-arg VITE_SUPABASE_PROJECT_ID=tu_project_id \
  -t vitalapp:latest .

# Ejecutar el contenedor
docker run -d -p 3000:80 --name vitalapp vitalapp:latest
```

### Opción 2: Docker Compose

```bash
# Asegúrate de tener el archivo .env configurado
docker-compose up -d
```

La aplicación estará disponible en: **http://localhost:3000**

### Opción 3: Scripts Automatizados

**En Windows (PowerShell):**
```powershell
.\deploy-local.ps1
```

**En Linux/Mac:**
```bash
chmod +x deploy-local.sh
./deploy-local.sh
```

## 🤖 CI/CD con GitHub Actions

El proyecto incluye un pipeline completo de CI/CD que se ejecuta automáticamente en cada push o pull request.

### Pipeline Stages

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Lint    │ -> │  Build   │ -> │  Docker  │ -> │  Deploy  │
│  Code    │    │  App     │    │  Image   │    │  Prod    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Configurar GitHub Actions

**1. Agregar secrets al repositorio de GitHub:**

Ve a: `Settings → Secrets and variables → Actions → New repository secret`

Agregar los siguientes secrets:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
VERCEL_TOKEN (opcional, para deploy automático)
VERCEL_ORG_ID (opcional)
VERCEL_PROJECT_ID (opcional)
```

**2. El pipeline se ejecutará automáticamente:**

- ✅ En cada **push** a `main` o `develop`
- ✅ En cada **pull request** a `main`
- ✅ Manualmente desde la pestaña **Actions**

### Verificar el estado del pipeline

Visita: `https://github.com/YOUR_USERNAME/VitalApp/actions`

## 🌐 Despliegue en Producción

### Opción 1: Vercel (Recomendado)

**Deploy automático desde GitHub:**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

O conecta tu repositorio directamente desde [vercel.com](https://vercel.com):

1. Import Git Repository
2. Configurar variables de entorno
3. Deploy

### Opción 2: Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Opción 3: Docker en Servidor Propio

```bash
# En tu servidor (VPS/Cloud)
git clone https://github.com/YOUR_USERNAME/VitalApp.git
cd VitalApp

# Configurar .env con tus variables
nano .env

# Construir y ejecutar con Docker Compose
docker-compose up -d

# Configurar Nginx como reverse proxy (opcional)
# Configurar SSL con Let's Encrypt (recomendado)
```

## 🔐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | URL de tu proyecto Supabase | `https://xxx.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave pública (anon key) | `eyJhbGci...` |
| `VITE_SUPABASE_PROJECT_ID` | ID del proyecto Supabase | `lkdnhdrumfqfsvjpytsy` |

⚠️ **Importante:** Nunca subas el archivo `.env` a Git. Usa `.env.example` como plantilla.

## 📁 Estructura del Proyecto

```
VitalApp/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline CI/CD
├── public/                     # Assets estáticos
├── src/
│   ├── components/
│   │   └── ui/                # Componentes Shadcn/ui
│   ├── hooks/                 # Custom hooks
│   ├── integrations/
│   │   └── supabase/          # Cliente Supabase
│   ├── lib/                   # Utilidades
│   ├── pages/                 # Páginas de la app
│   │   ├── Index.tsx          # Landing page
│   │   ├── Auth.tsx           # Login/Registro
│   │   ├── Dashboard.tsx      # Panel principal
│   │   ├── Appointments.tsx   # Gestión de citas
│   │   ├── Results.tsx        # Resultados médicos
│   │   └── Alerts.tsx         # Alertas de salud
│   ├── App.tsx                # Componente raíz
│   └── main.tsx               # Entry point
├── supabase/
│   └── migrations/            # Scripts SQL
├── .env.example               # Template de variables
├── .gitignore                 # Archivos ignorados
├── Dockerfile                 # Configuración Docker
├── docker-compose.yml         # Orquestación Docker
├── nginx.conf                 # Configuración Nginx
├── package.json               # Dependencias
├── tailwind.config.ts         # Configuración Tailwind
├── vite.config.ts             # Configuración Vite
└── README.md                  # Este archivo
```

## 💾 Base de Datos

### Esquema de Supabase

**Tablas:**

1. **profiles** - Información de pacientes
   - `id`, `full_name`, `email`, `phone`, `date_of_birth`, `blood_type`

2. **appointments** - Citas médicas
   - `id`, `patient_id`, `doctor_name`, `specialty`, `appointment_date`, `status`, `notes`

3. **medical_results** - Resultados de laboratorio
   - `id`, `patient_id`, `test_name`, `test_date`, `result_value`, `status`, `doctor_notes`

4. **health_alerts** - Alertas y notificaciones
   - `id`, `patient_id`, `title`, `message`, `alert_type`, `is_read`

### Políticas de Seguridad (RLS)

- Los usuarios solo pueden ver/editar **sus propios datos**
- Autenticación mediante **JWT tokens**
- Políticas granulares por tabla y operación (SELECT, INSERT, UPDATE)

### Migración de Base de Datos

```sql
-- Ejecutar en Supabase SQL Editor
-- Ver archivo: supabase/migrations/20251001194525_d6323d00-7215-4f36-883d-0228f248770c.sql
```

## 🧪 Testing

```bash
# Ejecutar tests unitarios (cuando estén implementados)
npm run test

# Ejecutar linter
npm run lint

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 📊 Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build de producción
  "build:dev": "vite build --mode development",
  "lint": "eslint .",               // Análisis de código
  "preview": "vite preview"         // Preview del build
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de una práctica académica de **DevOps** para la **Clínica Salud Vital**.

## 👥 Autores

- **Tu Nombre** - Desarrollo y DevOps

## 🔗 Enlaces Útiles

- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Shadcn/ui](https://ui.shadcn.com)
- [Documentación de Docker](https://docs.docker.com)

---

**Proyecto desarrollado como parte de la Práctica DevOps - Salud Vital** 🏥
