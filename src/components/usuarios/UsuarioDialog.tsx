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
import { Switch } from "@/components/ui/switch";
import { usuarioService } from "@/services/usuarioService";
import { toast } from "sonner";
import { Usuario } from "@/types";

interface UsuarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario | null;
}

export function UsuarioDialog({ open, onOpenChange, usuario }: UsuarioDialogProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Usuario>();

  const activo = watch("activo");

  useEffect(() => {
    if (usuario) {
      reset(usuario);
    } else {
      reset({
        username: "",
        password: "",
        email: "",
        nombre: "",
        apellido: "",
        activo: true,
      });
    }
  }, [usuario, reset]);

  const mutation = useMutation({
    mutationFn: (data: Usuario) =>
      usuario ? usuarioService.update(usuario.id!, data) : usuarioService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success(usuario ? "Usuario actualizado" : "Usuario creado");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Error al guardar el usuario");
    },
  });

  const onSubmit = (data: Usuario) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{usuario ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" {...register("username", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: !usuario })}
                placeholder={usuario ? "Dejar en blanco para no cambiar" : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: true })} />
          </div>

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

          <div className="flex items-center space-x-2">
            <Switch
              id="activo"
              checked={activo}
              onCheckedChange={(checked) => setValue("activo", checked)}
            />
            <Label htmlFor="activo">Usuario activo</Label>
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
