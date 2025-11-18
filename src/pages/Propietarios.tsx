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
import { propietarioService } from "@/services/propietarioService";
import { PropietarioDialog } from "@/components/propietarios/PropietarioDialog";
import { toast } from "sonner";
import { Propietario } from "@/types";

const Propietarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropietario, setSelectedPropietario] = useState<Propietario | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: propietarios = [], isLoading } = useQuery({
    queryKey: ['propietarios'],
    queryFn: propietarioService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: propietarioService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propietarios'] });
      toast.success("Propietario eliminado correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar el propietario");
    },
  });

  const filteredPropietarios = propietarios.filter((prop) =>
    `${prop.nombre} ${prop.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (propietario: Propietario) => {
    setSelectedPropietario(propietario);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este propietario?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreate = () => {
    setSelectedPropietario(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Propietarios</h1>
          <p className="text-muted-foreground">Gestión de propietarios de equinos</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Propietario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Propietarios</CardTitle>
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
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
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPropietarios.length > 0 ? (
                  filteredPropietarios.map((propietario) => (
                    <TableRow key={propietario.id}>
                      <TableCell className="font-medium">
                        {propietario.nombre} {propietario.apellido}
                      </TableCell>
                      <TableCell>{propietario.email}</TableCell>
                      <TableCell>{propietario.telefono}</TableCell>
                      <TableCell>{propietario.ciudad}</TableCell>
                      <TableCell>{propietario.pais}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(propietario)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(propietario.id!)}
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
                      No se encontraron propietarios
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <PropietarioDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propietario={selectedPropietario}
      />
    </div>
  );
};

export default Propietarios;
