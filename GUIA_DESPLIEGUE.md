# 🚀 GUÍA RÁPIDA DE DESPLIEGUE - VITALAPP

Esta guía te llevará del código fuente a una aplicación desplegada en producción en **menos de 30 minutos**.

---

## ✅ CHECKLIST PRE-DESPLIEGUE

Antes de empezar, asegúrate de tener:

- [ ] Cuenta de GitHub
- [ ] Cuenta de Supabase ([supabase.com](https://supabase.com))
- [ ] Cuenta de Vercel ([vercel.com](https://vercel.com)) O Netlify
- [ ] Node.js 20.x instalado
- [ ] Docker Desktop instalado (opcional, para testing local)
- [ ] Git instalado

---

## 🎯 OPCIÓN 1: DESPLIEGUE RÁPIDO (Vercel - Recomendado)

### Tiempo estimado: **10-15 minutos**

### Paso 1: Fork del Repositorio
```bash
# En GitHub, haz clic en "Fork" en el repositorio original
# Luego clona tu fork:
git clone https://github.com/TU_USUARIO/VitalApp.git
cd VitalApp
```

### Paso 2: Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto:
   - **Name:** VitalApp
   - **Database Password:** (genera una segura)
   - **Region:** (la más cercana a tus usuarios)
3. Espera 2-3 minutos a que se cree el proyecto
4. Ve a **Project Settings → API**
5. Copia:
   - `URL` (ejemplo: https://xxx.supabase.co)
   - `anon public` key

### Paso 3: Ejecutar Migración de Base de Datos

1. En Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia y pega todo el contenido de `supabase/migrations/20251001194525_d6323d00-7215-4f36-883d-0228f248770c.sql`
4. Ejecuta (Run)
5. Verifica que se crearon 4 tablas: `profiles`, `appointments`, `medical_results`, `health_alerts`

### Paso 4: Configurar Variables de Entorno Localmente

```bash
# Crea el archivo .env
cp .env.example .env

# Edita .env y agrega tus credenciales:
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...tu_key_aqui
VITE_SUPABASE_PROJECT_ID=xxx
```

### Paso 5: Probar Localmente (Opcional pero Recomendado)

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir: http://localhost:8080
# Registra una cuenta y prueba la app
```

### Paso 6: Deploy a Vercel

**Opción A: Desde la terminal**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Configurar variables cuando te pregunte:
# VITE_SUPABASE_URL: [tu URL]
# VITE_SUPABASE_PUBLISHABLE_KEY: [tu key]
# VITE_SUPABASE_PROJECT_ID: [tu project ID]

# Deploy a producción
vercel --prod
```

**Opción B: Desde la interfaz web (más fácil)**

1. Ve a [vercel.com](https://vercel.com/new)
2. Click en **Import Git Repository**
3. Autoriza GitHub y selecciona tu repo `VitalApp`
4. En **Configure Project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Agrega **Environment Variables**:
   ```
   VITE_SUPABASE_URL = https://xxx.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY = eyJhbGci...
   VITE_SUPABASE_PROJECT_ID = xxx
   ```
6. Click en **Deploy**
7. Espera 2-3 minutos
8. ✅ ¡Listo! Tu app está en: `https://tu-proyecto.vercel.app`

### Paso 7: Configurar Deploy Automático

Ya está configurado! Cada vez que hagas push a `main`:
1. GitHub Actions corre automáticamente
2. Vercel detecta el cambio
3. Rebuild y redeploy automático
4. Nueva versión live en ~2 minutos

---

## 🐳 OPCIÓN 2: DESPLIEGUE CON DOCKER

### Tiempo estimado: **15-20 minutos**

### Paso 1-3: Igual que la Opción 1 (Fork, Supabase, Migración)

### Paso 4: Construir Imagen Docker

**En Windows (PowerShell):**
```powershell
.\deploy-local.ps1
```

**En Linux/Mac:**
```bash
chmod +x deploy-local.sh
./deploy-local.sh
```

**O manualmente:**
```bash
# Construir
docker build \
  --build-arg VITE_SUPABASE_URL=https://xxx.supabase.co \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci... \
  --build-arg VITE_SUPABASE_PROJECT_ID=xxx \
  -t vitalapp:latest .

# Ejecutar
docker run -d -p 3000:80 --name vitalapp vitalapp:latest

# Verificar
docker logs -f vitalapp
```

### Paso 5: Acceder

Abre: **http://localhost:3000**

### Paso 6: Deploy a Servidor (VPS/Cloud)

```bash
# En tu servidor (Ubuntu/Debian)
git clone https://github.com/TU_USUARIO/VitalApp.git
cd VitalApp

# Crear .env con tus variables
nano .env

# Construir y ejecutar
docker-compose up -d

# Configurar Nginx como reverse proxy (opcional)
# Configurar SSL con Let's Encrypt (recomendado)
```

---

## 🤖 OPCIÓN 3: CI/CD CON GITHUB ACTIONS

### Tiempo estimado: **20-30 minutos**

### Paso 1-3: Igual que la Opción 1

### Paso 4: Configurar GitHub Secrets

1. Ve a tu repo en GitHub
2. **Settings → Secrets and variables → Actions**
3. Click en **New repository secret**
4. Agrega los siguientes secrets:

```
Name: VITE_SUPABASE_URL
Value: https://xxx.supabase.co

Name: VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGci...

Name: VITE_SUPABASE_PROJECT_ID
Value: xxx
```

### Paso 5: Habilitar GitHub Actions

1. Ve a **Actions** en tu repo
2. Si está deshabilitado, click en **Enable GitHub Actions**
3. El workflow `.github/workflows/ci-cd.yml` ya está configurado

### Paso 6: Hacer un Push

```bash
git add .
git commit -m "chore: configurar CI/CD"
git push origin main
```

### Paso 7: Verificar el Pipeline

1. Ve a **Actions** en GitHub
2. Verás el workflow corriendo
3. Espera a que termine (~5 minutos)
4. ✅ Si todo está verde, el pipeline funciona!

### Paso 8: Configurar Vercel Deploy (Opcional)

Para que el pipeline también haga deploy automático:

1. Genera un token en Vercel:
   - [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Click en **Create**
   - Copia el token

2. Agrega más secrets en GitHub:
   ```
   VERCEL_TOKEN: [tu token]
   VERCEL_ORG_ID: [tu org ID de Vercel]
   VERCEL_PROJECT_ID: [tu project ID de Vercel]
   ```

3. Push de nuevo:
   ```bash
   git commit --allow-empty -m "chore: activar auto-deploy"
   git push origin main
   ```

4. ✅ Ahora cada push a `main` = deploy automático!

---

## 🔧 TROUBLESHOOTING

### Problema: "Missing environment variables"

**Causa:** Variables de entorno no configuradas

**Solución:**
```bash
# Verifica que el .env existe
cat .env

# Verifica que las variables están cargadas
npm run dev
# Deberías ver las variables en la consola si hay error
```

### Problema: "Supabase connection failed"

**Causa:** URL o key incorrectas

**Solución:**
1. Ve a Supabase → Project Settings → API
2. Copia de nuevo la URL y la key
3. Verifica que no haya espacios extra
4. Verifica que la key empieza con `eyJhbGci`

### Problema: "Docker build failed"

**Causa:** Falta pasar build args

**Solución:**
```bash
# Asegúrate de pasar TODOS los build args:
docker build \
  --build-arg VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
  --build-arg VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID \
  -t vitalapp:latest .
```

### Problema: "GitHub Actions failing"

**Causa:** Secrets no configurados

**Solución:**
1. Ve a Settings → Secrets
2. Verifica que TODOS los secrets estén ahí
3. Re-run el workflow

### Problema: "Cannot register user"

**Causa:** Migración de BD no ejecutada

**Solución:**
1. Ve a Supabase → SQL Editor
2. Ejecuta el script de migración completo
3. Verifica en Table Editor que las tablas existen

---

## 📊 VERIFICACIÓN POST-DESPLIEGUE

Después de desplegar, verifica:

✅ **Frontend:**
- [ ] La página carga correctamente
- [ ] No hay errores en la consola del navegador
- [ ] Los estilos se ven bien

✅ **Autenticación:**
- [ ] Puedes crear una cuenta nueva
- [ ] Puedes iniciar sesión
- [ ] Puedes cerrar sesión

✅ **Funcionalidades:**
- [ ] Puedes agendar una cita
- [ ] El dashboard muestra estadísticas
- [ ] Las alertas se muestran (aunque estén vacías)

✅ **Performance:**
- [ ] La página carga en < 3 segundos
- [ ] No hay errores en Network tab
- [ ] Las transiciones son fluidas

---

## 🎉 ¡FELICIDADES!

Tu aplicación VitalApp está desplegada y funcionando. Ahora puedes:

### Siguientes Pasos:

1. **Personalizar el dominio** (Vercel permite dominios custom)
2. **Agregar datos de prueba** en Supabase para demostración
3. **Invitar al equipo** a probar la aplicación
4. **Monitorear** los logs y métricas
5. **Iterar** y mejorar basado en feedback

### Recursos Útiles:

- **Ver logs en Vercel:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Ver BD en Supabase:** [app.supabase.com](https://app.supabase.com)
- **Ver pipeline en GitHub:** Repo → Actions
- **Documentación completa:** `README.md`
- **Informe técnico:** `INFORME_DEVOPS.md`

### Comandos Útiles:

```bash
# Ver logs de Docker
docker logs -f vitalapp

# Rebuild y redeploy
vercel --prod

# Ver status del pipeline
git push origin main
# Luego ve a Actions en GitHub

# Rollback a versión anterior (Vercel)
vercel rollback [deployment-url]
```

---

## 📞 SOPORTE

Si tienes problemas:

1. **Revisa los logs:**
   - Vercel: Dashboard → Logs
   - Docker: `docker logs vitalapp`
   - GitHub Actions: Actions → Select workflow

2. **Verifica las variables de entorno:**
   - Local: `cat .env`
   - Vercel: Settings → Environment Variables
   - GitHub: Settings → Secrets

3. **Consulta la documentación:**
   - `README.md` - Guía completa
   - `INFORME_DEVOPS.md` - Informe técnico
   - Supabase Docs: [supabase.com/docs](https://supabase.com/docs)

4. **Rollback si es necesario:**
   ```bash
   # Git
   git revert HEAD
   git push origin main
   
   # Docker
   docker run vitalapp:previous-tag
   
   # Vercel
   vercel rollback
   ```

---

**¡Buena suerte con tu proyecto VitalApp!** 🏥🚀
