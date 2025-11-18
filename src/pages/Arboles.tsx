import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { equinoService } from "@/services/equinoService";
import { arbolService } from "@/services/arbolService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArbolViewer } from "@/components/arboles/ArbolViewer";

const Arboles = () => {
  const [selectedEquinoId, setSelectedEquinoId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: equinos = [] } = useQuery({
    queryKey: ['equinos'],
    queryFn: equinoService.getAll,
  });

  const { data: arbol, isLoading: loadingArbol } = useQuery({
    queryKey: ['arbol', selectedEquinoId],
    queryFn: () => arbolService.getByEquinoId(Number(selectedEquinoId)),
    enabled: !!selectedEquinoId,
  });

  const filteredEquinos = equinos.filter((equino) =>
    equino.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Árbol Genealógico</h1>
        <p className="text-muted-foreground">Visualización del pedigree de equinos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Equino</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Buscar Equino</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Seleccionar</Label>
              <Select value={selectedEquinoId} onValueChange={setSelectedEquinoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un equino" />
                </SelectTrigger>
                <SelectContent>
                  {filteredEquinos.map((equino) => (
                    <SelectItem key={equino.id} value={String(equino.id)}>
                      {equino.nombre} - {equino.raza}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedEquinoId && (
        <Card>
          <CardHeader>
            <CardTitle>Árbol Genealógico</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingArbol ? (
              <div className="text-center py-12 text-muted-foreground">Cargando árbol...</div>
            ) : arbol ? (
              <ArbolViewer arbol={arbol} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No se encontró información genealógica para este equino
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Arboles;
