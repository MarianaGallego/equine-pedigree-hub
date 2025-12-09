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
import { equinoService } from "@/services/equinoService";
import { EquinoDialog } from "@/components/equinos/EquinoDialog";
import { toast } from "sonner";
import { Equino } from "@/types";

const Equinos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEquino, setSelectedEquino] = useState<Equino | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: equinos = [], isLoading } = useQuery({
    queryKey: ['equinos'],
    queryFn: equinoService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: equinoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equinos'] });
      toast.success("Equino eliminado correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar el equino");
    },
  });

  const filteredEquinos = equinos.filter((equino) =>
    equino.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (equino: Equino) => {
    setSelectedEquino(equino);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este equino?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreate = () => {
    setSelectedEquino(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Equinos</h1>
          <p className="text-muted-foreground">Gestión de caballos registrados</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Equino
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Equinos</CardTitle>
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre"
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
                  <TableHead>Chip</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Genero</TableHead>
                  <TableHead>Fecha de nacimiento</TableHead>
                  <TableHead>Tipo de paso</TableHead>
                  <TableHead>Tipo de sangre</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>Observacion</TableHead>
                  <TableHead>Propietario</TableHead>
                  <TableHead>Arbol genealogico</TableHead>
                  <TableHead>Esta vivo</TableHead>
                  <TableHead>Fecha de fallecimiento</TableHead>
                  <TableHead>Fecha de creacion</TableHead>
                  <TableHead>Fecha de actualizacion</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquinos.length > 0 ? (
                  filteredEquinos.map((equino) => (
                    <TableRow key={equino.id}>
                      <TableCell className="font-medium">{equino.idEquino}</TableCell>
                      <TableCell>{equino.idChip}</TableCell>
                      <TableCell>{equino.nombre}</TableCell>
                      <TableCell>{equino.apellido}</TableCell>
                      <TableCell>{equino.genero}</TableCell>
                      <TableCell>{equino.fechaDeNacimiento}</TableCell>
                      <TableCell>{equino.tipoDePaso}</TableCell>
                      <TableCell>{equino.tipoDeSangre}</TableCell>
                      <TableCell>{equino.urlFoto}</TableCell>
                      <TableCell>{equino.observacion}</TableCell>
                      <TableCell>{equino.propietario}</TableCell>
                      <TableCell>{equino.arbolGenealogico}</TableCell>
                      <TableCell>{equino.estaVivo}</TableCell>
                      <TableCell>{equino.fechaDeFallecimiento}</TableCell>
                      <TableCell>{equino.fechaDeCreacion}</TableCell>
                      <TableCell>{equino.fechaDeActualizacion}</TableCell>
                      <TableCell>{new Date(equino.fechaNacimiento).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(equino)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(equino.id!)}
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
                      No se encontraron equinos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EquinoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        equino={selectedEquino}
      />
    </div>
  );
};

export default Equinos;
