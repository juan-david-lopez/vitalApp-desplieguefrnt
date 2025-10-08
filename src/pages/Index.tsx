import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Bell, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="gradient-hero text-white">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8" />
            <span className="text-2xl font-bold">Salud Vital</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to="/auth">Iniciar Sesión</Link>
            </Button>
            <Button className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/auth">Registrarse</Link>
            </Button>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Tu Salud, Nuestra Prioridad
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Gestiona tus citas médicas, consulta resultados y recibe alertas personalizadas en un solo lugar
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6" asChild>
            <Link to="/auth">Comenzar Ahora</Link>
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Servicios Disponibles
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary transition-colors shadow-elegant">
            <CardContent className="pt-8">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Agendar Citas</h3>
              <p className="text-muted-foreground">
                Programa tus consultas médicas de forma rápida y sencilla. Elige el especialista y horario que mejor se ajuste a ti.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-colors shadow-elegant">
            <CardContent className="pt-8">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Resultados Médicos</h3>
              <p className="text-muted-foreground">
                Accede a tus resultados de laboratorio y estudios en cualquier momento. Toda tu información médica segura y disponible.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent transition-colors shadow-elegant">
            <CardContent className="pt-8">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Alertas de Salud</h3>
              <p className="text-muted-foreground">
                Recibe notificaciones importantes sobre tu salud, recordatorios de citas y recomendaciones personalizadas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            ¿Por Qué Elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Seguridad</h3>
              <p className="text-muted-foreground">
                Tus datos médicos están protegidos con los más altos estándares de seguridad
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Profesionales</h3>
              <p className="text-muted-foreground">
                Equipo médico altamente calificado y con años de experiencia
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Atención Personalizada</h3>
              <p className="text-muted-foreground">
                Cuidado médico adaptado a tus necesidades individuales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground">
          Comienza a Cuidar tu Salud Hoy
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Únete a miles de pacientes que ya confían en Salud Vital para gestionar su bienestar
        </p>
        <Button size="lg" className="gradient-primary text-white text-lg px-8 py-6" asChild>
          <Link to="/auth">Crear Cuenta Gratis</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6" />
            <span className="text-xl font-semibold">Salud Vital</span>
          </div>
          <p className="text-white/70">
            © 2025 Salud Vital. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
