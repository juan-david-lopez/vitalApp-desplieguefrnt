import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ArrowLeft, AlertCircle, Info, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";

const Alerts = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        fetchAlerts(session.user.id);
      } else {
        navigate("/auth");
      }
    });
  }, [navigate]);

  const fetchAlerts = async (userId: string) => {
    const { data, error } = await supabase
      .from("health_alerts")
      .select("*")
      .eq("patient_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar las alertas");
      setLoading(false);
      return;
    }

    setAlerts(data || []);
    setLoading(false);
  };

  const markAsRead = async (alertId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from("health_alerts")
      .update({ is_read: true })
      .eq("id", alertId);

    if (error) {
      toast.error("Error al marcar como leída");
      return;
    }

    toast.success("Alerta marcada como leída");
    fetchAlerts(userId);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-6 w-6 text-danger" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case "info":
        return <Info className="h-6 w-6 text-info" />;
      default:
        return <Bell className="h-6 w-6" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent": return "border-l-danger bg-danger/5";
      case "warning": return "border-l-warning bg-warning/5";
      case "info": return "border-l-info bg-info/5";
      default: return "border-l-muted";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "urgent": return "Urgente";
      case "warning": return "Advertencia";
      case "info": return "Información";
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "urgent": return "bg-danger";
      case "warning": return "bg-warning";
      case "info": return "bg-info";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Bell className="h-10 w-10 text-accent" />
            Alertas de Salud
          </h1>
          <p className="text-muted-foreground">
            Mantente informado sobre tu salud con notificaciones personalizadas
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando alertas...</p>
          </div>
        ) : alerts.length === 0 ? (
          <Card className="shadow-elegant">
            <CardContent className="py-12 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                No tienes alertas de salud
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Las notificaciones importantes aparecerán aquí
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`shadow-md border-l-4 ${getAlertColor(alert.alert_type)} ${
                  !alert.is_read ? 'ring-2 ring-accent/20' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.alert_type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          {!alert.is_read && (
                            <Badge variant="secondary" className="text-xs">Nueva</Badge>
                          )}
                        </div>
                        <Badge className={`${getTypeBadgeColor(alert.alert_type)} text-white text-xs`}>
                          {getTypeText(alert.alert_type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{alert.message}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {new Date(alert.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {!alert.is_read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(alert.id)}
                        className="gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Marcar como leída
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Alerts;