import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { campeonatoService } from "@/services/campeonatoService";
import { CampeonatoDialog } from "@/components/campeonatos/CampeonatoDialog";
import { toast } from "sonner";
import { Campeonato } from "@/types";

const Campeonatos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampeonato, setSelectedCampeonato] = useState<Campeonato | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: campeonatos = [], isLoading } = useQuery({
    queryKey: ['campeonatos'],
    queryFn: campeonatoService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: campeonatoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campeonatos'] });
      toast.success("Campeonato eliminado correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar el campeonato");
    },
  });

  const filteredCampeonatos = campeonatos.filter((camp) =>
    camp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camp.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (campeonato: Campeonato) => {
    setSelectedCampeonato(campeonato);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este campeonato?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreate = () => {
    setSelectedCampeonato(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campeonatos</h1>
          <p className="text-muted-foreground">Gestión de eventos y competencias</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Campeonato
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Campeonatos</CardTitle>
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o ubicacion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Cargando...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Ubicacion</TableHead>
                  <TableHead>Descripcion</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampeonatos.length > 0 ? (
                  filteredCampeonatos.map((campeonato) => (
                    <TableRow key={campeonato.id}>
                      <TableCell>{campeonato.idCampeonato}</TableCell>
                      <TableCell className="font-medium">{campeonato.nombre}</TableCell>
                      <TableCell>{campeonato.ubicacion}</TableCell>
                      <TableCell>{campeonato.descripcion}</TableCell>
                      <TableCell>{campeonato.nivelDeCampeonato}</TableCell>
                      <TableCell>{new Date(campeonato.fechaDeCampeonato).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(campeonato)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(campeonato.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron campeonatos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CampeonatoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        campeonato={selectedCampeonato}
      />
    </div>
  );
};

export default Campeonatos;
