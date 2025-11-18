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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { equinoService } from "@/services/equinoService";
import { toast } from "sonner";
import { Equino } from "@/types";

interface EquinoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equino: Equino | null;
}

export function EquinoDialog({ open, onOpenChange, equino }: EquinoDialogProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Equino>();

  const sexo = watch("sexo");

  useEffect(() => {
    if (equino) {
      reset(equino);
    } else {
      reset({
        nombre: "",
        fechaNacimiento: "",
        sexo: "MACHO",
        color: "",
        raza: "",
      });
    }
  }, [equino, reset]);

  const mutation = useMutation({
    mutationFn: (data: Equino) =>
      equino ? equinoService.update(equino.id!, data) : equinoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equinos'] });
      toast.success(equino ? "Equino actualizado" : "Equino creado");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Error al guardar el equino");
    },
  });

  const onSubmit = (data: Equino) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{equino ? "Editar Equino" : "Nuevo Equino"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" {...register("nombre", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="raza">Raza</Label>
              <Input id="raza" {...register("raza", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" {...register("color", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sexo">Sexo</Label>
              <Select value={sexo} onValueChange={(value) => setValue("sexo", value as "MACHO" | "HEMBRA")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MACHO">Macho</SelectItem>
                  <SelectItem value="HEMBRA">Hembra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                {...register("fechaNacimiento", { required: true })}
              />
            </div>
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
