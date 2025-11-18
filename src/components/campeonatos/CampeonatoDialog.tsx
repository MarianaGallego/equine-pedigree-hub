import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { campeonatoService } from "@/services/campeonatoService";
import { toast } from "sonner";
import { Campeonato } from "@/types";

interface CampeonatoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campeonato: Campeonato | null;
}

export function CampeonatoDialog({ open, onOpenChange, campeonato }: CampeonatoDialogProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Campeonato>();

  useEffect(() => {
    if (campeonato) {
      reset(campeonato);
    } else {
      reset({
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
        lugar: "",
        descripcion: "",
      });
    }
  }, [campeonato, reset]);

  const mutation = useMutation({
    mutationFn: (data: Campeonato) =>
      campeonato ? campeonatoService.update(campeonato.id!, data) : campeonatoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campeonatos'] });
      toast.success(campeonato ? "Campeonato actualizado" : "Campeonato creado");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Error al guardar el campeonato");
    },
  });

  const onSubmit = (data: Campeonato) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{campeonato ? "Editar Campeonato" : "Nuevo Campeonato"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" {...register("nombre", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lugar">Lugar</Label>
            <Input id="lugar" {...register("lugar", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
              <Input
                id="fechaInicio"
                type="date"
                {...register("fechaInicio", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha de Fin</Label>
              <Input
                id="fechaFin"
                type="date"
                {...register("fechaFin", { required: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              {...register("descripcion")}
              rows={4}
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
