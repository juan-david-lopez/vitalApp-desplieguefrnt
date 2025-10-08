# 🚨 Configurar Variables de Entorno en Vercel

Tu app funciona en local pero no en Vercel porque **faltan las variables de entorno de Supabase**.

## 🔧 Solución: Agregar Variables de Entorno en Vercel

### Paso 1: Ve a tu Proyecto en Vercel

**URL Directa a Settings:**
https://vercel.com/alfJaRB2Mb2PMBMzR4UhMF17/prj_tWyprGkn8GWfjgN5J9CQVXFdAeIr/settings/environment-variables

O navega manualmente:
1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto: **vitalapp** (o como lo hayas nombrado)
3. Clic en **Settings** (pestaña superior)
4. En el menú izquierdo: **Environment Variables**

---

### Paso 2: Agregar las 3 Variables

Haz clic en **"Add New"** o el botón para agregar variables y agrega estas 3:

#### Variable 1: VITE_SUPABASE_URL
```
Key: VITE_SUPABASE_URL
Value: https://lkdnhdrumfqfsvjpytsy.supabase.co
Environment: Production, Preview, Development (selecciona todos)
```

#### Variable 2: VITE_SUPABASE_PUBLISHABLE_KEY
```
Key: VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZG5oZHJ1bWZxZnN2anB5dHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDM0NDIsImV4cCI6MjA3NDkxOTQ0Mn0.QcsSYBbmksZ5ifUV1s0i_Oiud8DWyzI8oqCfbNDBuYU
Environment: Production, Preview, Development (selecciona todos)
```

#### Variable 3: VITE_SUPABASE_PROJECT_ID
```
Key: VITE_SUPABASE_PROJECT_ID
Value: lkdnhdrumfqfsvjpytsy
Environment: Production, Preview, Development (selecciona todos)
```

**💡 IMPORTANTE:** Asegúrate de seleccionar los 3 ambientes (Production, Preview, Development) para cada variable.

---

### Paso 3: Re-Deploy el Proyecto

Después de agregar las variables, tienes 2 opciones:

#### Opción A: Re-deploy desde Vercel Dashboard
1. Ve a la pestaña **Deployments**
2. Encuentra el último deployment
3. Clic en los 3 puntos `...`
4. Clic en **"Redeploy"**
5. Confirma el redeploy

#### Opción B: Push desde Git (Automático)
```bash
# Hacer un push vacío para trigger el deployment
git commit --allow-empty -m "chore: redeploy to apply environment variables"
git push origin main
```

---

## ✅ Verificar que Funciona

### 1. Espera a que termine el deployment (2-3 minutos)

### 2. Ve a tu URL de Vercel
Tu app debería estar en algo como:
```
https://vital-app-despleguefrnt.vercel.app
```
(o revisa en Vercel Dashboard → tu proyecto → "Visit")

### 3. Abre la Consola del Navegador
- Presiona `F12`
- Ve a la pestaña **Console**
- Ya NO deberías ver el error 401
- Ya NO debería decir "Missing Supabase environment variables"

### 4. Prueba Registrarte
- Intenta crear una cuenta
- Debería funcionar correctamente

---

## 🔍 Troubleshooting

### Si sigue sin funcionar:

**1. Verifica que las variables estén guardadas**
- Ve a Settings → Environment Variables en Vercel
- Deberías ver las 3 variables listadas
- Verifica que no haya espacios al inicio o final de los valores

**2. Verifica el Build Log**
- Ve a Deployments → tu último deployment
- Clic en "Building" o "View Build Logs"
- Busca si hay errores relacionados con variables de entorno

**3. Revisa la Console del navegador en producción**
- Abre tu app en Vercel
- Presiona F12 → Console
- ¿Qué error específico ves?

**4. Verifica que el deployment sea después de agregar las variables**
- Las variables solo se aplican en nuevos deployments
- Si agregaste las variables después del deploy, necesitas re-deployar

---

## 📸 Guía Visual Rápida

```
Vercel Dashboard
└── Tu Proyecto
    └── Settings (tab superior)
        └── Environment Variables (menú izquierdo)
            └── Add New (botón)
                ├── Key: VITE_SUPABASE_URL
                ├── Value: https://lkdnhdrumfqfsvjpytsy.supabase.co
                └── Environments: ✓ Production ✓ Preview ✓ Development
```

---

## 🚀 Comando Rápido para Re-deploy

Ejecuta esto después de agregar las variables:

```bash
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp
git commit --allow-empty -m "chore: trigger redeploy with env vars"
git push origin main
```

---

## ✅ Checklist

- [ ] Agregar `VITE_SUPABASE_URL` en Vercel
- [ ] Agregar `VITE_SUPABASE_PUBLISHABLE_KEY` en Vercel
- [ ] Agregar `VITE_SUPABASE_PROJECT_ID` en Vercel
- [ ] Verificar que los 3 ambientes estén seleccionados
- [ ] Re-deployar el proyecto
- [ ] Esperar a que termine el build
- [ ] Probar la app en producción
- [ ] Verificar que no haya error 401
- [ ] Probar registro/login

---

## 💡 ¿Por qué funciona en local pero no en Vercel?

**Local:**
- Lee las variables desde tu archivo `.env`
- El archivo existe en tu máquina

**Vercel:**
- NO tiene acceso a tu archivo `.env` local
- Lee las variables desde la configuración del proyecto
- Necesitas agregarlas manualmente en el dashboard

---

## 📞 Siguiente Paso

1. **Agrega las 3 variables en Vercel** (toma 2 minutos)
2. **Haz push o re-deploy**
3. **Avísame cuando termine** el deployment
4. Te ayudo a verificar que todo funcione

¿Listo para agregar las variables? 🚀
