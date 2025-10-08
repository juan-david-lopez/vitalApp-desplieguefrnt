# 🚀 PASOS PARA COMPLETAR LA MIGRACIÓN A NUEVA BASE DE DATOS

## ✅ YA HECHO
- [x] Actualizar archivo `.env` local

---

## 📋 LO QUE NECESITAS HACER AHORA

### 1️⃣ Crear las Tablas en Supabase (CRÍTICO)

**Ve a:** https://supabase.com/dashboard/project/dhnxesnowllslbmjtzbw/sql/new

**Pasos:**

1. Haz clic en **"SQL Editor"** en el menú izquierdo
2. Haz clic en **"New query"**
3. Copia y pega TODO este SQL:

```sql
-- Create profiles table for patient information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  blood_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medical results table
CREATE TABLE public.medical_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  test_date DATE NOT NULL,
  result_type TEXT NOT NULL,
  result_value TEXT NOT NULL,
  unit TEXT,
  reference_range TEXT,
  status TEXT NOT NULL DEFAULT 'normal' CHECK (status IN ('normal', 'abnormal', 'critical')),
  doctor_notes TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health alerts table
CREATE TABLE public.health_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  alert_type TEXT NOT NULL DEFAULT 'info' CHECK (alert_type IN ('info', 'warning', 'urgent')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can create their own appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update their own appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() = patient_id);

-- RLS Policies for medical results
CREATE POLICY "Users can view their own medical results"
  ON public.medical_results FOR SELECT
  USING (auth.uid() = patient_id);

-- RLS Policies for health alerts
CREATE POLICY "Users can view their own alerts"
  ON public.health_alerts FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can update their own alerts"
  ON public.health_alerts FOR UPDATE
  USING (auth.uid() = patient_id);

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_appointments
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_medical_results_patient_id ON public.medical_results(patient_id);
CREATE INDEX idx_health_alerts_patient_id ON public.health_alerts(patient_id);
CREATE INDEX idx_health_alerts_read ON public.health_alerts(patient_id, is_read);
```

4. Haz clic en **"Run"** o presiona `Ctrl+Enter`
5. Deberías ver: **"Success. No rows returned"**

---

### 2️⃣ Actualizar Variables en Vercel

**Ve a:** https://vercel.com/dashboard → tu proyecto → **Settings** → **Environment Variables**

**Edita estas 3 variables** (haz clic en el icono de lápiz en cada una):

```
VITE_SUPABASE_URL
Nuevo valor: https://dhnxesnowllslbmjtzbw.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY
Nuevo valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnhlc25vd2xsc2xibWp0emJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTU0MTYsImV4cCI6MjA3NTQ5MTQxNn0.9f8wQZKDHG4z2sTlZA7aGWKUbTVrAl03h7ZdfjtSPwM

VITE_SUPABASE_PROJECT_ID
Nuevo valor: dhnxesnowllslbmjtzbw
```

**Importante:** Haz clic en **"Save"** en cada una después de editarla.

---

### 3️⃣ Re-deployar en Vercel

**Opción A: Desde el Dashboard**
1. Ve a la pestaña **"Deployments"**
2. Último deployment → **...** (3 puntos)
3. **"Redeploy"**

**Opción B: Desde Git (ejecuta este comando en tu terminal)**
```powershell
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp
git commit --allow-empty -m "chore: migrate to new Supabase database"
git push origin main
```

---

### 4️⃣ Probar en Local

**Reinicia tu servidor local:**

```powershell
# Si está corriendo, detenlo con Ctrl+C en la terminal

# Luego reinicia
cd C:\Users\murde\SeguimientoSoft3\vitalAppV2\VitalApp
npm run dev
```

**Prueba:**
1. Ve a: http://localhost:8080
2. Regístrate con un nuevo usuario
3. Deberías poder crear citas, ver resultados, etc.

---

### 5️⃣ Verificar en Producción (después del re-deploy)

1. Espera 2-3 minutos a que termine el deployment
2. Ve a tu app en Vercel
3. Presiona **Ctrl+Shift+R** (hard refresh)
4. Regístrate y prueba la app

---

## ✅ Checklist Completo

- [ ] **Ejecutar SQL en Supabase** (crear tablas) ← CRÍTICO
- [ ] **Actualizar variables en Vercel**
- [ ] **Re-deployar** (push o manual)
- [ ] **Reiniciar servidor local**
- [ ] **Probar registro en local**
- [ ] **Esperar deployment en Vercel**
- [ ] **Probar registro en producción**

---

## 🎯 Orden de Ejecución

1. **PRIMERO:** Ejecuta el SQL en Supabase (crear tablas)
2. **SEGUNDO:** Actualiza variables en Vercel
3. **TERCERO:** Re-deploya
4. **CUARTO:** Prueba

---

## ⚠️ Si Algo No Funciona

### Error: "relation public.profiles does not exist"
→ No ejecutaste el SQL. Ve al paso 1.

### Error: "No API key found"
→ No actualizaste las variables en Vercel. Ve al paso 2.

### Error: "Failed to load"
→ No re-deployaste después de cambiar variables. Ve al paso 3.

---

## 📞 URLs Importantes

- **Supabase Dashboard:** https://supabase.com/dashboard/project/dhnxesnowllslbmjtzbw
- **SQL Editor:** https://supabase.com/dashboard/project/dhnxesnowllslbmjtzbw/sql/new
- **Vercel Settings:** https://vercel.com/dashboard → tu proyecto → Settings
- **GitHub Repo:** https://github.com/juan-david-lopez/vitalApp-desplieguefrnt

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu app funcionará con la nueva base de datos tanto en local como en producción.
