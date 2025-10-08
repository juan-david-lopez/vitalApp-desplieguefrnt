import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const appointmentSchema = z.object({
  doctorName: z.string().min(2, { message: "El nombre del doctor es requerido" }),
  specialty: z.string().min(2, { message: "La especialidad es requerida" }),
  date: z.string().min(1, { message: "La fecha es requerida" }),
  time: z.string().min(1, { message: "La hora es requerida" }),
  notes: z.string().optional(),
});

const Appointments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    doctorName: "",
    specialty: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        fetchAppointments(session.user.id);
      } else {
        navigate("/auth");
      }
    });
  }, [navigate]);

  const fetchAppointments = async (userId: string) => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_id", userId)
      .order("appointment_date", { ascending: true });

    if (error) {
      toast.error("Error al cargar las citas");
      return;
    }

    setAppointments(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      const validated = appointmentSchema.parse(formData);
      const appointmentDateTime = `${validated.date}T${validated.time}:00`;

      const { error } = await supabase.from("appointments").insert({
        patient_id: userId,
        doctor_name: validated.doctorName,
        specialty: validated.specialty,
        appointment_date: appointmentDateTime,
        notes: validated.notes || null,
        status: "pending",
      });

      if (error) throw error;

      toast.success("¡Cita agendada exitosamente!");
      setFormData({
        doctorName: "",
        specialty: "",
        date: "",
        time: "",
        notes: "",
      });
      fetchAppointments(userId);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Error al agendar la cita");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success";
      case "pending": return "bg-warning";
      case "cancelled": return "bg-danger";
      case "completed": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmada";
      case "pending": return "Pendiente";
      case "cancelled": return "Cancelada";
      case "completed": return "Completada";
      default: return status;
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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Calendar className="h-10 w-10 text-primary" />
            Agendar Cita Médica
          </h1>
          <p className="text-muted-foreground">
            Programa tu consulta con nuestros especialistas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Nueva Cita</CardTitle>
              <CardDescription>Completa los datos para agendar tu consulta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Nombre del Doctor</Label>
                  <Input
                    id="doctorName"
                    placeholder="Dr. Juan Pérez"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicina-general">Medicina General</SelectItem>
                      <SelectItem value="cardiologia">Cardiología</SelectItem>
                      <SelectItem value="dermatologia">Dermatología</SelectItem>
                      <SelectItem value="pediatria">Pediatría</SelectItem>
                      <SelectItem value="ginecologia">Ginecología</SelectItem>
                      <SelectItem value="traumatologia">Traumatología</SelectItem>
                      <SelectItem value="oftalmologia">Oftalmología</SelectItem>
                      <SelectItem value="neurologia">Neurología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas (Opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Motivo de la consulta o información adicional..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-white"
                  disabled={loading}
                >
                  {loading ? "Agendando..." : "Agendar Cita"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Mis Citas</h2>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No tienes citas programadas. ¡Agenda tu primera consulta!
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id} className="shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor_name}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.appointment_date).toLocaleDateString('es-ES')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(appointment.appointment_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted rounded-md">
                          {appointment.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;