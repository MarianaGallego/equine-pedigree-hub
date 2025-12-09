import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Search } from "lucide-react";
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
import { equinoCampeonatoService } from "@/services/equinoCampeonatoService";
import { InscripcionDialog } from "@/components/inscripciones/InscripcionDialog";
import { toast } from "sonner";
import { Equino_Campeonato } from "@/types";

const Inscripciones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: inscripciones = [], isLoading } = useQuery({
    queryKey: ['inscripciones'],
    queryFn: equinoCampeonatoService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: equinoCampeonatoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
      toast.success("Inscripción eliminada correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar la inscripción");
    },
  });

  const filteredInscripciones = inscripciones.filter((insc) =>
    insc.equino?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insc.campeonato?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar esta inscripción?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreate = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inscripciones</h1>
          <p className="text-muted-foreground">Gestión de participación en campeonatos</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Inscripción
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Inscripciones</CardTitle>
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por equino o campeonato..."
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
                  <TableHead>Equino</TableHead>
                  <TableHead>Campeonato</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Puntaje</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Procedencia</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInscripciones.length > 0 ? (
                  filteredInscripciones.map((inscripcion) => (
                    <TableRow key={inscripcion.id}>
                      <TableCell>{inscripcion.idEquinoCampeonato || "-"}</TableCell>
                      <TableCell>{inscripcion.categoria || "-"}</TableCell>
                      <TableCell>{inscripcion.puntaje || "-"}</TableCell>
                      <TableCell>{inscripcion.resultado || "-"}</TableCell>
                      <TableCell>{inscripcion.procedencia || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(inscripcion.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron inscripciones
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <InscripcionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default Inscripciones;
