import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Bell, LogOut, Heart, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    appointments: 0,
    results: 0,
    alerts: 0,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchStats(session.user.id);
      } else {
        navigate("/auth");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchStats = async (userId: string) => {
    const [appointmentsRes, resultsRes, alertsRes] = await Promise.all([
      supabase.from("appointments").select("id", { count: "exact" }).eq("patient_id", userId),
      supabase.from("medical_results").select("id", { count: "exact" }).eq("patient_id", userId),
      supabase.from("health_alerts").select("id", { count: "exact" }).eq("patient_id", userId).eq("is_read", false),
    ]);

    setStats({
      appointments: appointmentsRes.count || 0,
      results: resultsRes.count || 0,
      alerts: alertsRes.count || 0,
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2 text-primary">
            <Heart className="h-8 w-8" />
            <span className="text-2xl font-bold">Salud Vital</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Bienvenido a tu Panel de Salud
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus citas, resultados y alertas desde aquí
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Citas</CardTitle>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.appointments}</p>
              <p className="text-sm text-muted-foreground mt-1">Citas programadas</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Resultados</CardTitle>
                <FileText className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">{stats.results}</p>
              <p className="text-sm text-muted-foreground mt-1">Estudios disponibles</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Alertas</CardTitle>
                <Bell className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{stats.alerts}</p>
              <p className="text-sm text-muted-foreground mt-1">Notificaciones nuevas</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-elegant hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Agendar Cita</CardTitle>
              <CardDescription>
                Programa una nueva consulta médica con nuestros especialistas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-primary text-white" asChild>
                <Link to="/appointments">Agendar Ahora</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Ver Resultados</CardTitle>
              <CardDescription>
                Consulta tus resultados de laboratorio y estudios médicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-secondary hover:bg-secondary-dark text-white" asChild>
                <Link to="/results">Ver Resultados</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Alertas de Salud</CardTitle>
              <CardDescription>
                Revisa tus notificaciones y recomendaciones personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-accent hover:bg-accent/90 text-white" asChild>
                <Link to="/alerts">Ver Alertas</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;