import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { equinoCampeonatoService } from "@/services/equinoCampeonatoService";
import { equinoService } from "@/services/equinoService";
import { campeonatoService } from "@/services/campeonatoService";
import { toast } from "sonner";
import { Equino_Campeonato } from "@/types";

interface InscripcionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InscripcionDialog({ open, onOpenChange }: InscripcionDialogProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Equino_Campeonato>();

  const equipoId = watch("equipoId");
  const campeonatoId = watch("campeonatoId");

  const { data: equinos = [] } = useQuery({
    queryKey: ['equinos'],
    queryFn: equinoService.getAll,
  });

  const { data: campeonatos = [] } = useQuery({
    queryKey: ['campeonatos'],
    queryFn: campeonatoService.getAll,
  });

  const mutation = useMutation({
    mutationFn: (data: Equino_Campeonato) => equinoCampeonatoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
      toast.success("Inscripción creada correctamente");
      onOpenChange(false);
      reset();
    },
    onError: () => {
      toast.error("Error al crear la inscripción");
    },
  });

  const onSubmit = (data: Equino_Campeonato) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Inscripción</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equipoId">Equino</Label>
            <Select value={String(equipoId || "")} onValueChange={(value) => setValue("equipoId", Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un equino" />
              </SelectTrigger>
              <SelectContent>
                {equinos.map((equino) => (
                  <SelectItem key={equino.id} value={String(equino.id)}>
                    {equino.nombre} - {equino.raza}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campeonatoId">Campeonato</Label>
            <Select value={String(campeonatoId || "")} onValueChange={(value) => setValue("campeonatoId", Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un campeonato" />
              </SelectTrigger>
              <SelectContent>
                {campeonatos.map((campeonato) => (
                  <SelectItem key={campeonato.id} value={String(campeonato.id)}>
                    {campeonato.nombre} - {campeonato.lugar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="posicion">Posición</Label>
              <Input
                id="posicion"
                type="number"
                {...register("posicion")}
                placeholder="Opcional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="puntos">Puntos</Label>
              <Input
                id="puntos"
                type="number"
                {...register("puntos")}
                placeholder="Opcional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              {...register("observaciones")}
              placeholder="Opcional"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
