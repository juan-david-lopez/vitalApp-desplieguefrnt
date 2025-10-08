import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchResults(session.user.id);
      } else {
        navigate("/auth");
      }
    });
  }, [navigate]);

  const fetchResults = async (userId: string) => {
    const { data, error } = await supabase
      .from("medical_results")
      .select("*")
      .eq("patient_id", userId)
      .order("test_date", { ascending: false });

    if (error) {
      toast.error("Error al cargar los resultados");
      setLoading(false);
      return;
    }

    setResults(data || []);
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "abnormal":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "critical":
        return <AlertCircle className="h-5 w-5 text-danger" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success";
      case "abnormal": return "bg-warning";
      case "critical": return "bg-danger";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal": return "Normal";
      case "abnormal": return "Anormal";
      case "critical": return "Crítico";
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
            <FileText className="h-10 w-10 text-secondary" />
            Resultados Médicos
          </h1>
          <p className="text-muted-foreground">
            Consulta tus resultados de laboratorio y estudios médicos
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando resultados...</p>
          </div>
        ) : results.length === 0 ? (
          <Card className="shadow-elegant">
            <CardContent className="py-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                No tienes resultados médicos disponibles
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Los resultados de tus estudios aparecerán aquí una vez estén listos
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {results.map((result) => (
              <Card key={result.id} className="shadow-elegant hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <CardTitle className="text-xl">{result.test_name}</CardTitle>
                        <CardDescription className="mt-1">
                          {new Date(result.test_date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(result.status)} text-white`}>
                      {getStatusText(result.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tipo de Estudio</p>
                        <p className="font-medium">{result.result_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Resultado</p>
                        <p className="font-medium">
                          {result.result_value}
                          {result.unit && <span className="text-muted-foreground ml-1">{result.unit}</span>}
                        </p>
                      </div>
                    </div>

                    {result.reference_range && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Rango de Referencia</p>
                        <p className="text-sm">{result.reference_range}</p>
                      </div>
                    )}

                    {result.doctor_notes && (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">Notas del Médico:</p>
                        <p className="text-sm text-muted-foreground">{result.doctor_notes}</p>
                      </div>
                    )}

                    {result.file_url && (
                      <div>
                        <a
                          href={result.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          Ver documento completo
                        </a>
                      </div>
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

export default Results;