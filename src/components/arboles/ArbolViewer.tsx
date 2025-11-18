import { ArbolGenealogico } from "@/types";
import { Card } from "@/components/ui/card";

interface ArbolViewerProps {
  arbol: ArbolGenealogico;
}

export function ArbolViewer({ arbol }: ArbolViewerProps) {
  const EquinoCard = ({ nombre, relacion }: { nombre?: string; relacion: string }) => (
    <Card className="p-3 bg-card border-border">
      <p className="text-xs text-muted-foreground mb-1">{relacion}</p>
      <p className="font-medium text-foreground">{nombre || "Sin registro"}</p>
    </Card>
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] space-y-6 p-4">
        {/* Equino Principal */}
        <div className="flex justify-center">
          <Card className="p-4 bg-primary text-primary-foreground border-primary">
            <p className="text-sm mb-1">Equino</p>
            <p className="font-bold text-lg">{arbol.equino?.nombre || "Principal"}</p>
          </Card>
        </div>

        {/* Generación 1: Padres */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <EquinoCard nombre={arbol.padre?.nombre} relacion="Padre" />
            
            {/* Abuelos Paternos */}
            <div className="ml-4 space-y-2">
              <EquinoCard nombre={arbol.abueloPaterno?.nombre} relacion="Abuelo Paterno" />
              <EquinoCard nombre={arbol.abuelaPaterna?.nombre} relacion="Abuela Paterna" />
            </div>
          </div>

          <div className="space-y-2">
            <EquinoCard nombre={arbol.madre?.nombre} relacion="Madre" />
            
            {/* Abuelos Maternos */}
            <div className="ml-4 space-y-2">
              <EquinoCard nombre={arbol.abueloMaterno?.nombre} relacion="Abuelo Materno" />
              <EquinoCard nombre={arbol.abuelaMaterna?.nombre} relacion="Abuela Materna" />
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex justify-center pt-4">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Equino principal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-card border border-border rounded"></div>
              <span>Ancestros</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
