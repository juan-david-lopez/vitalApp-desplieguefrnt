# 🔐 CONFIGURAR GITHUB SECRETS

## ✅ CÓDIGO SUBIDO EXITOSAMENTE

Tu código ya está en GitHub:
🔗 **https://github.com/juan-david-lopez/vitalApp-desplieguefrnt**

---

## 📋 SIGUIENTE PASO: Configurar Secrets para CI/CD

Para que el pipeline de GitHub Actions funcione, necesitas configurar los **Secrets** con tus credenciales de Supabase.

### Paso 1: Ir a la configuración de Secrets

1. Ve a tu repositorio: https://github.com/juan-david-lopez/vitalApp-desplieguefrnt
2. Click en **Settings** (pestaña superior)
3. En el menú izquierdo, click en **Secrets and variables** → **Actions**
4. Click en el botón verde **"New repository secret"**

### Paso 2: Agregar los Secrets

Necesitas agregar **3 secrets** con los valores de tu archivo `.env`:

#### Secret 1: VITE_SUPABASE_URL
```
Name: VITE_SUPABASE_URL
Value: https://lkdnhdrumfqfsvjpytsy.supabase.co
```
Click en **"Add secret"**

#### Secret 2: VITE_SUPABASE_PUBLISHABLE_KEY
```
Name: VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZG5oZHJ1bWZxZnN2anB5dHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDM0NDIsImV4cCI6MjA3NDkxOTQ0Mn0.QcsSYBbmksZ5ifUV1s0i_Oiud8DWyzI8oqCfbNDBuYU
```
Click en **"Add secret"**

#### Secret 3: VITE_SUPABASE_PROJECT_ID
```
Name: VITE_SUPABASE_PROJECT_ID
Value: lkdnhdrumfqfsvjpytsy
```
Click en **"Add secret"**

### Paso 3: Verificar que los Secrets están configurados

Deberías ver algo así:
```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_PUBLISHABLE_KEY
✅ VITE_SUPABASE_PROJECT_ID
```

---

## 🤖 PROBAR EL PIPELINE CI/CD

Una vez configurados los secrets, el pipeline se ejecutará automáticamente cuando hagas push:

### Opción 1: Ver el pipeline actual

1. Ve a tu repositorio
2. Click en la pestaña **"Actions"** (arriba)
3. Deberías ver el workflow corriendo o completado

### Opción 2: Activar el pipeline manualmente

1. Ve a **Actions**
2. Selecciona **"VitalApp CI/CD Pipeline"** (lado izquierdo)
3. Click en **"Run workflow"** (botón derecho)
4. Selecciona branch: `main`
5. Click en el botón verde **"Run workflow"**

### Opción 3: Hacer un cambio para disparar el pipeline

```powershell
# Hacer un cambio pequeño
echo "# VitalApp DevOps" >> README.md

# Commit y push
git add .
git commit -m "test: probar pipeline CI/CD"
git push origin main

# Ir a Actions en GitHub para ver el pipeline
```

---

## 📊 STAGES DEL PIPELINE

Tu pipeline tiene 4 etapas:

```
1. ✅ Lint & Code Quality
   └─ ESLint + TypeScript check

2. ✅ Build Application
   └─ npm ci
   └─ npm run build
   └─ Upload artifacts

3. ✅ Build Docker Image (solo en push)
   └─ Build imagen
   └─ Push a GitHub Container Registry

4. ✅ Deploy to Production (solo en main)
   └─ Deploy a Vercel/Netlify
   └─ (Necesita secrets adicionales de Vercel)
```

---

## 🚀 DESPLIEGUE A VERCEL (Opcional)

Si quieres que el pipeline también haga deploy automático a Vercel:

### Paso 1: Crear cuenta en Vercel

1. Ve a https://vercel.com
2. Sign up con GitHub
3. Autoriza Vercel para acceder a tu repositorio

### Paso 2: Obtener tokens de Vercel

1. Ve a https://vercel.com/account/tokens
2. Click en **"Create"**
3. Nombre: `VitalApp CI/CD`
4. Scope: Full Account
5. Click en **"Create"**
6. **Copia el token** (solo se muestra una vez)

### Paso 3: Obtener IDs del proyecto

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link el proyecto
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp
vercel link

# Esto te dará los IDs
```

### Paso 4: Agregar secrets de Vercel en GitHub

Volver a Settings → Secrets and variables → Actions:

```
VERCEL_TOKEN: [tu token de Vercel]
VERCEL_ORG_ID: [tu org ID]
VERCEL_PROJECT_ID: [tu project ID]
```

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Código subido a GitHub
- [ ] Secret: VITE_SUPABASE_URL agregado
- [ ] Secret: VITE_SUPABASE_PUBLISHABLE_KEY agregado
- [ ] Secret: VITE_SUPABASE_PROJECT_ID agregado
- [ ] Pipeline visible en la pestaña Actions
- [ ] Base de datos configurada en Supabase
- [ ] (Opcional) Vercel configurado para deploy automático

---

## 🐛 TROUBLESHOOTING

### El pipeline falla en el step "Build application"

**Causa:** Secrets no configurados correctamente

**Solución:** Verifica que los nombres de los secrets sean EXACTAMENTE:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

(Sin espacios, mayúsculas correctas)

### El pipeline falla en "Build Docker Image"

**Causa:** Falta permiso de escritura en packages

**Solución:** 
1. Ve a Settings → Actions → General
2. Scroll hasta "Workflow permissions"
3. Selecciona "Read and write permissions"
4. Click en "Save"

### No veo la pestaña "Actions"

**Causa:** Actions deshabilitado en el repo

**Solución:**
1. Ve a Settings → Actions → General
2. En "Actions permissions", selecciona "Allow all actions"
3. Click en "Save"

---

## 📞 VERIFICAR QUE TODO FUNCIONA

### ✅ Paso 1: Verificar el repositorio
```
URL: https://github.com/juan-david-lopez/vitalApp-desplieguefrnt
✅ Código visible
✅ Archivo .github/workflows/ci-cd.yml presente
```

### ✅ Paso 2: Verificar Secrets
```
Settings → Secrets and variables → Actions
✅ 3 secrets configurados
```

### ✅ Paso 3: Verificar Pipeline
```
Actions → VitalApp CI/CD Pipeline
✅ Al menos 1 workflow ejecutado (puede estar en rojo por falta de secrets)
```

### ✅ Paso 4: Después de configurar secrets
```
Actions → Re-run failed jobs
✅ Pipeline completo en verde
```

---

## 🎉 ¡LISTO!

Una vez configurados los secrets, tu pipeline DevOps está completo:

- ✅ Cada push a `main` → Deploy automático
- ✅ Cada Pull Request → Tests automáticos
- ✅ Docker image → GitHub Container Registry
- ✅ Code quality → ESLint check

---

## 📚 RECURSOS ADICIONALES

- **Ver el pipeline:** https://github.com/juan-david-lopez/vitalApp-desplieguefrnt/actions
- **Documentación:** Lee `README.md` y `INFORME_DEVOPS.md` en el repo
- **Guía rápida:** Lee `GUIA_DESPLIEGUE.md`

---

**¡Tu proyecto DevOps está listo para la presentación!** 🚀🏥
