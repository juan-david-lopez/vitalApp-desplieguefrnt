# 🆕 Nueva Base de Datos Supabase - Configuración Actualizada

## ✅ Archivo .env Local - YA ACTUALIZADO

Tu archivo `.env` local ha sido actualizado con las nuevas credenciales:

```env
VITE_SUPABASE_PROJECT_ID="dhnxesnowllslbmjtzbw"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM"
VITE_SUPABASE_URL="https://dhnxesnowllslbmjtzbw.supabase.co"
```

---

## 🔄 Actualizar Variables en Vercel

### Paso 1: Ir a Environment Variables en Vercel

Ve a: https://vercel.com/dashboard → tu proyecto → **Settings** → **Environment Variables**

### Paso 2: Actualizar las 3 Variables

**Opción A: Editar las existentes**

Haz clic en **Edit** (icono de lápiz) en cada una y cambia los valores:

```
VITE_SUPABASE_URL
Nuevo valor: https://dhnxesnowllslbmjtzbw.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY
Nuevo valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM

VITE_SUPABASE_PROJECT_ID
Nuevo valor: dhnxesnowllslbmjtzbw
```

**Opción B: Eliminar y volver a crear**

1. Elimina las 3 variables antiguas
2. Crea nuevas con los valores de arriba

---

## 🔄 Actualizar GitHub Secrets (Opcional pero Recomendado)

Ve a: https://github.com/juan-david-lopez/vitalApp-desplieguefrnt/settings/secrets/actions

Actualiza estos secrets:

```
VITE_SUPABASE_URL
Valor: https://dhnxesnowllslbmjtzbw.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM

VITE_SUPABASE_PROJECT_ID
Valor: dhnxesnowllslbmjtzbw
```

---

## 🗄️ Crear las Tablas en la Nueva Base de Datos

Tu nueva base de datos está vacía. Necesitas crear las tablas:

### Opción 1: Ejecutar la Migración SQL

1. Ve a: https://supabase.com/dashboard/project/dhnxesnowllslbmjtzbw
2. SQL Editor (menú izquierdo)
3. Copia y pega el contenido del archivo:
   ```
   VitalApp/supabase/migrations/20251001194525_d6323d00-7215-4f36-883d-0228f248770c.sql
   ```
4. Ejecuta el SQL

### Opción 2: Usar Supabase CLI (si lo tienes instalado)

```bash
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp
supabase db push
```

---

## 📋 Tablas que Necesitas Crear

Tu app necesita estas 4 tablas:

1. **profiles** - Perfiles de usuarios
2. **appointments** - Citas médicas
3. **medical_results** - Resultados médicos
4. **health_alerts** - Alertas de salud

---

## 🚀 Re-deployar Después de Actualizar

Una vez que actualices las variables en Vercel, re-deploya:

```bash
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp
git commit --allow-empty -m "chore: update to new Supabase database"
git push origin main
```

O re-deploya desde Vercel Dashboard:
- Deployments → último deploy → ... → Redeploy

---

## ✅ Checklist de Migración

- [x] Actualizar `.env` local (YA HECHO)
- [ ] Actualizar variables en Vercel
- [ ] Crear tablas en nueva base de datos (ejecutar SQL)
- [ ] Actualizar GitHub Secrets (opcional)
- [ ] Re-deployar aplicación
- [ ] Probar registro de usuario
- [ ] Verificar que la app funcione

---

## 📝 Información de la Nueva Base de Datos

```
Proyecto ID: dhnxesnowllslbmjtzbw
URL: https://dhnxesnowllslbmjtzbw.supabase.co
Dashboard: https://supabase.com/dashboard/project/dhnxesnowllslbmjtzbw
```

---

## ⚠️ IMPORTANTE: Ejecutar la Migración SQL

Tu nueva base de datos NO tiene tablas todavía. Necesitas:

1. Ir al SQL Editor en Supabase
2. Ejecutar el archivo de migración
3. O crear las tablas manualmente

Sin las tablas, la app no funcionará aunque las variables estén correctas.

---

## 🔍 Verificar que Todo Funciona

Después de hacer todos los pasos:

1. **Local:** Reinicia el servidor de desarrollo
   ```bash
   # Detener el servidor actual (Ctrl+C)
   npm run dev
   ```

2. **Vercel:** Espera el re-deploy y prueba la app

3. **Probar:** Intenta registrarte y crear una cita

---

## 💾 Respaldo de Credenciales Antiguas

Por si las necesitas:

```
# Base de datos ANTIGUA (ya no usar)
VITE_SUPABASE_PROJECT_ID="lkdnhdrumfqfsvjpytsy"
VITE_SUPABASE_URL="https://lkdnhdrumfqfsvjpytsy.supabase.co"
```
