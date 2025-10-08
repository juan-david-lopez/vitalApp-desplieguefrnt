# 🚀 Configuración de Vercel para VitalApp

## Opción 1: Configuración Manual (Recomendada)

### A. Crear Proyecto en Vercel

1. **Ve a tu Dashboard de Vercel**
   - URL: https://vercel.com/dashboard

2. **Importar Proyecto desde GitHub**
   - Clic en "Add New..." → "Project"
   - Selecciona tu repositorio: `juan-david-lopez/vitalApp-desplieguefrnt`
   - Si no aparece, autoriza el acceso a GitHub

3. **Configurar el Proyecto**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Agregar Variables de Entorno**
   Antes de hacer deploy, agrega estas variables:
   
   ```
   VITE_SUPABASE_URL=https://lkdnhdrumfqfsvjpytsy.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZG5oZHJ1bWZxZnN2anB5dHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MTQ0MTQsImV4cCI6MjA0MzM5MDQxNH0.qBj9B4LxUXjh-8eC4mq3bfODPYy9hs1i4hTdTrM_v50
   VITE_SUPABASE_PROJECT_ID=lkdnhdrumfqfsvjpytsy
   ```

5. **Deploy**
   - Clic en "Deploy"
   - Espera a que termine el build (2-3 minutos)
   - ✅ Tu app estará en: `https://tu-proyecto.vercel.app`

### B. Obtener IDs Necesarios

**Después del primer deploy manual:**

1. **VERCEL_ORG_ID**
   - Ve a: https://vercel.com/account
   - Copia tu "Team ID" o "User ID"
   - Formato: `team_xxxxxxxxxxxxxxxxxxxxx`

2. **VERCEL_PROJECT_ID**
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → General
   - Busca "Project ID"
   - Formato: `prj_xxxxxxxxxxxxxxxxxxxxx`

3. **VERCEL_TOKEN**
   - Ya lo obtuviste en el paso anterior
   - Formato: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Opción 2: Usar Vercel CLI (Alternativa)

### Instalar Vercel CLI

```bash
npm i -g vercel
```

### Login y Link

```bash
# Login
vercel login

# Navega a tu proyecto
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp

# Link al proyecto (esto genera los IDs automáticamente)
vercel link
```

Sigue las instrucciones:
- Setup and deploy? `Y`
- Which scope? Selecciona tu cuenta
- Link to existing project? `N` (primera vez)
- Project name? `vitalapp` (o el que prefieras)

### Obtener los IDs

Después de hacer `vercel link`, se crea el archivo `.vercel/project.json`:

```bash
cat .vercel/project.json
```

Verás algo como:
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxxx"
}
```

### Deploy Manual (Opcional)

```bash
# Deploy de prueba
vercel

# Deploy a producción
vercel --prod
```

---

## 📋 Agregar Secrets a GitHub

Una vez que tengas los 3 valores, agrégalos a GitHub:

1. Ve a: https://github.com/juan-david-lopez/vitalApp-desplieguefrnt/settings/secrets/actions

2. Clic en "New repository secret" para cada uno:

   **Secret 1:**
   ```
   Name: VERCEL_TOKEN
   Value: [tu token de vercel]
   ```

   **Secret 2:**
   ```
   Name: VERCEL_ORG_ID
   Value: [tu org id]
   ```

   **Secret 3:**
   ```
   Name: VERCEL_PROJECT_ID
   Value: [tu project id]
   ```

3. ✅ Una vez agregados, el próximo push activará el deploy automático

---

## 🔍 Verificar que Funciona

### 1. Push de Prueba
```bash
git commit --allow-empty -m "test: trigger Vercel deployment"
git push origin main
```

### 2. Ver el Pipeline
https://github.com/juan-david-lopez/vitalApp-desplieguefrnt/actions

Deberías ver:
- ✅ Lint & Code Quality
- ✅ Build Application
- ✅ Build Docker Image
- ✅ Deploy to Production (ahora debería funcionar)

### 3. Ver el Deploy en Vercel
https://vercel.com/dashboard

Deberías ver tu proyecto con el deployment activo.

---

## ⚠️ Troubleshooting

### Error: "Project not found"
- Verifica que VERCEL_PROJECT_ID sea correcto
- Asegúrate de haber creado el proyecto en Vercel primero

### Error: "Invalid token"
- Genera un nuevo token
- Asegúrate de copiar todo el token completo
- Verifica que el token tenga permisos suficientes

### Error: "Build failed"
- Verifica las variables de entorno en Vercel
- Revisa los logs en Vercel Dashboard → Deployments → [tu deploy] → Build Logs

### Variables de entorno no funcionan
- En Vercel, ve a Settings → Environment Variables
- Asegúrate de agregar las 3 variables de Supabase
- Re-deploy el proyecto

---

## 📚 Recursos

- Documentación Vercel Tokens: https://vercel.com/docs/rest-api#authentication
- Vercel CLI Docs: https://vercel.com/docs/cli
- GitHub Actions con Vercel: https://github.com/amondnet/vercel-action

---

## ✅ Checklist Final

- [ ] Cuenta de Vercel creada
- [ ] Token de Vercel generado y guardado
- [ ] Proyecto importado desde GitHub
- [ ] Variables de entorno configuradas en Vercel
- [ ] Primer deploy manual exitoso
- [ ] VERCEL_TOKEN agregado a GitHub Secrets
- [ ] VERCEL_ORG_ID agregado a GitHub Secrets
- [ ] VERCEL_PROJECT_ID agregado a GitHub Secrets
- [ ] Pipeline de GitHub Actions corriendo exitosamente
- [ ] App desplegada y funcionando en Vercel
