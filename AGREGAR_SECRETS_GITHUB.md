# 🔐 Agregar Secrets a GitHub - VitalApp

## ✅ Valores que necesitas agregar

```
VERCEL_TOKEN = jOA14JKyLacH1IXTZNheqxlh
VERCEL_ORG_ID = alfJaRB2Mb2PMBMzR4UhMF17
VERCEL_PROJECT_ID = prj_tWyprGkn8GWfjgN5J9CQVXFdAeIr
```

---

## 📝 Pasos para Agregar los Secrets

### 1. Ve a la Configuración de Secrets

**URL Directa:**
https://github.com/juan-david-lopez/vitalApp-desplieguefrnt/settings/secrets/actions

O navega manualmente:
- Ve a tu repositorio: https://github.com/juan-david-lopez/vitalApp-desplieguefrnt
- Clic en **Settings** (arriba a la derecha)
- En el menú izquierdo: **Secrets and variables** → **Actions**

---

### 2. Agregar Secret #1: VERCEL_TOKEN

1. Clic en **"New repository secret"** (botón verde)
2. Llena los campos:
   ```
   Name: VERCEL_TOKEN
   Secret: jOA14JKyLacH1IXTZNheqxlh
   ```
3. Clic en **"Add secret"**

---

### 3. Agregar Secret #2: VERCEL_ORG_ID

1. Clic en **"New repository secret"** nuevamente
2. Llena los campos:
   ```
   Name: VERCEL_ORG_ID
   Secret: alfJaRB2Mb2PMBMzR4UhMF17
   ```
3. Clic en **"Add secret"**

---

### 4. Agregar Secret #3: VERCEL_PROJECT_ID

1. Clic en **"New repository secret"** nuevamente
2. Llena los campos:
   ```
   Name: VERCEL_PROJECT_ID
   Secret: prj_tWyprGkn8GWfjgN5J9CQVXFdAeIr
   ```
3. Clic en **"Add secret"**

---

## ✅ Verificar que están agregados

Deberías ver 6 secrets en total:
- ✅ VERCEL_TOKEN
- ✅ VERCEL_ORG_ID
- ✅ VERCEL_PROJECT_ID
- ✅ VITE_SUPABASE_URL
- ✅ VITE_SUPABASE_PUBLISHABLE_KEY
- ✅ VITE_SUPABASE_PROJECT_ID

---

## 🚀 Probar el Deployment Automático

Una vez agregados los secrets, haz un push para activar el pipeline:

```bash
# Opción 1: Commit vacío para forzar el pipeline
git commit --allow-empty -m "test: trigger automatic Vercel deployment"
git push origin main

# Opción 2: Hacer cualquier cambio pequeño
echo "# Deployment Test" >> README.md
git add README.md
git commit -m "test: trigger deployment"
git push origin main
```

---

## 📊 Ver el Resultado

### 1. GitHub Actions
Ve a: https://github.com/juan-david-lopez/vitalApp-desplieguefrnt/actions

Deberías ver el workflow corriendo con:
- ✅ Lint & Code Quality
- ✅ Build Application
- ✅ Build Docker Image
- ✅ **Deploy to Production** (¡ahora debería funcionar!)
- ✅ Notification

### 2. Vercel Dashboard
Ve a: https://vercel.com/dashboard

Deberías ver tu proyecto con un nuevo deployment activo.

### 3. Tu Aplicación en Vivo
Tu app estará disponible en una URL como:
```
https://vitalapp-despleguefrnt.vercel.app
```
(o similar, según el nombre que le hayas puesto)

---

## ⚠️ Troubleshooting

### Si el deploy falla:

1. **Revisa los logs en GitHub Actions:**
   - Clic en el workflow que falló
   - Clic en "Deploy to Production"
   - Lee el error

2. **Verifica los secrets:**
   - Asegúrate de haber copiado los valores completos
   - No debe haber espacios al inicio o final
   - Los nombres deben ser EXACTOS (mayúsculas)

3. **Revisa Vercel:**
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Asegúrate que las 3 variables de Supabase estén ahí

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Copia el error completo de GitHub Actions
2. Mándame el mensaje de error
3. Te ayudaré a solucionarlo

---

## 🎉 ¡Listo!

Una vez que veas el ✅ verde en GitHub Actions y tu app en Vercel, ¡habrás completado el deployment automático completo con CI/CD!

Tu flujo será:
```
git push → GitHub Actions → Build & Test → Deploy to Vercel → App Live ✅
```
