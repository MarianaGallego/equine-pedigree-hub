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
import { propietarioService } from "@/services/propietarioService";
import { toast } from "sonner";
import { Propietario } from "@/types";

interface PropietarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propietario: Propietario | null;
}

export function PropietarioDialog({ open, onOpenChange, propietario }: PropietarioDialogProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Propietario>();

  useEffect(() => {
    if (propietario) {
      reset(propietario);
    } else {
      reset({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        pais: "",
      });
    }
  }, [propietario, reset]);

  const mutation = useMutation({
    mutationFn: (data: Propietario) =>
      propietario ? propietarioService.update(propietario.id!, data) : propietarioService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propietarios'] });
      toast.success(propietario ? "Propietario actualizado" : "Propietario creado");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Error al guardar el propietario");
    },
  });

  const onSubmit = (data: Propietario) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{propietario ? "Editar Propietario" : "Nuevo Propietario"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" {...register("nombre", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" {...register("apellido", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" {...register("telefono", { required: true })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" {...register("direccion", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input id="ciudad" {...register("ciudad", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pais">País</Label>
              <Input id="pais" {...register("pais", { required: true })} />
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
