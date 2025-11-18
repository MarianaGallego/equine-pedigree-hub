import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, UserCog } from "lucide-react";
import { equinoService } from "@/services/equinoService";
import { propietarioService } from "@/services/propietarioService";
import { campeonatoService } from "@/services/campeonatoService";
import { usuarioService } from "@/services/usuarioService";

const Dashboard = () => {
  const { data: equinos = [] } = useQuery({
    queryKey: ['equinos'],
    queryFn: equinoService.getAll,
  });

  const { data: propietarios = [] } = useQuery({
    queryKey: ['propietarios'],
    queryFn: propietarioService.getAll,
  });

  const { data: campeonatos = [] } = useQuery({
    queryKey: ['campeonatos'],
    queryFn: campeonatoService.getAll,
  });

  const { data: usuarios = [] } = useQuery({
    queryKey: ['usuarios'],
    queryFn: usuarioService.getAll,
  });

  const stats = [
    {
      title: "Total Equinos",
      value: equinos.length,
      icon: Users,
      description: "Caballos registrados",
      color: "text-primary",
    },
    {
      title: "Propietarios",
      value: propietarios.length,
      icon: Users,
      description: "Propietarios activos",
      color: "text-accent",
    },
    {
      title: "Campeonatos",
      value: campeonatos.length,
      icon: Trophy,
      description: "Eventos registrados",
      color: "text-success",
    },
    {
      title: "Usuarios",
      value: usuarios.length,
      icon: UserCog,
      description: "Usuarios del sistema",
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Vista general del sistema de gestión equina</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Equinos Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            {equinos.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {equinos.slice(0, 5).map((equino) => (
                  <div key={equino.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{equino.nombre}</p>
                      <p className="text-sm text-muted-foreground">{equino.raza}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{equino.sexo}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No hay equinos registrados</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Campeonatos</CardTitle>
          </CardHeader>
          <CardContent>
            {campeonatos.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {campeonatos.slice(0, 5).map((campeonato) => (
                  <div key={campeonato.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{campeonato.nombre}</p>
                      <p className="text-sm text-muted-foreground">{campeonato.lugar}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(campeonato.fechaInicio).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No hay campeonatos programados</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
