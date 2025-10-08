# ✅ Variables de Entorno en Vercel - ACTUALIZACIÓN

## 📋 Estado Actual

Vercel ya creó automáticamente:
```
✅ VITE_SUPABASE_URL = https://dhnxesnowllslbmjtzbw.supabase.co
✅ VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM
```

## ⚠️ Problema

Tu código usa `VITE_SUPABASE_PUBLISHABLE_KEY` pero Vercel creó `VITE_SUPABASE_ANON_KEY`.

**Son la misma clave**, pero el nombre es diferente.

## 🔧 Solución (Elige UNA opción)

### Opción A: Agregar la variable en Vercel (Recomendado)

**Ve a:** Vercel Dashboard → tu proyecto → Settings → Environment Variables

**Agrega estas 2 variables adicionales:**

```
Nombre: VITE_SUPABASE_PUBLISHABLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM
Environments: ✓ Production ✓ Preview ✓ Development

Nombre: VITE_SUPABASE_PROJECT_ID
Valor: dhnxesnowllslbmjtzbw
Environments: ✓ Production ✓ Preview ✓ Development
```

### Opción B: Cambiar el código (Más rápido)

Modificar el código para usar `VITE_SUPABASE_ANON_KEY` en lugar de `VITE_SUPABASE_PUBLISHABLE_KEY`.

---

## 🎯 Variables Finales Necesarias en Vercel

Para que funcione completamente, necesitas tener estas 3:

```
VITE_SUPABASE_URL = https://dhnxesnowllslbmjtzbw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM
VITE_SUPABASE_PROJECT_ID = dhnxesnowllslbmjtzbw
```

(Puedes mantener también `VITE_SUPABASE_ANON_KEY` que ya está, no hay problema)

---

## ✅ Checklist de Configuración

- [x] VITE_SUPABASE_URL en Vercel (ya existe)
- [x] VITE_SUPABASE_ANON_KEY en Vercel (ya existe)
- [ ] VITE_SUPABASE_PUBLISHABLE_KEY en Vercel (agregar)
- [ ] VITE_SUPABASE_PROJECT_ID en Vercel (agregar)
- [ ] Ejecutar SQL en Supabase (crear tablas)
- [ ] Re-deployar en Vercel

---

## 🚀 Próximos Pasos

1. **Agregar las 2 variables que faltan en Vercel** (PUBLISHABLE_KEY y PROJECT_ID)
2. **Ejecutar el SQL en Supabase** (crear las 4 tablas)
3. **Re-deployar**

---

## 💡 Nota Técnica

`VITE_SUPABASE_ANON_KEY` y `VITE_SUPABASE_PUBLISHABLE_KEY` son la misma clave, solo con nombres diferentes. En Supabase se llama "anon/public key", pero en tu código lo nombras "publishable_key".
