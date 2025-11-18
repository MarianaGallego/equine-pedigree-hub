// Tipos para las entidades del sistema

export interface Equino {
  id?: number;
  nombre: string;
  fechaNacimiento: string;
  sexo: 'MACHO' | 'HEMBRA';
  color: string;
  raza: string;
  propietarioId?: number;
  propietario?: Propietario;
  tipoDePasoId?: number;
  tipoDePaso?: TipoDePaso;
  arbolGenealogico?: ArbolGenealogico;
  campeonatos?: Campeonato[];
}

export interface Propietario {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  pais: string;
  equinos?: Equino[];
}

export interface Campeonato {
  id?: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  lugar: string;
  descripcion: string;
  categoriaId?: number;
  categoria?: Categoria;
  equinos?: Equino[];
}

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion: string;
}

export interface TipoDePaso {
  id?: number;
  nombre: string;
  descripcion: string;
}

export interface ArbolGenealogico {
  id?: number;
  equinoId: number;
  equino?: Equino;
  padreId?: number;
  padre?: Equino;
  madreId?: number;
  madre?: Equino;
  abueloPaternoId?: number;
  abueloPaterno?: Equino;
  abuelaPaternaId?: number;
  abuelaPaterna?: Equino;
  abueloMaternoId?: number;
  abueloMaterno?: Equino;
  abuelaMaternaId?: number;
  abuelaMaterna?: Equino;
}

export interface Equino_Campeonato {
  id?: number;
  equipoId: number;
  equino?: Equino;
  campeonatoId: number;
  campeonato?: Campeonato;
  posicion?: number;
  puntos?: number;
  observaciones?: string;
}

export interface Usuario {
  id?: number;
  username: string;
  password?: string;
  email: string;
  nombre: string;
  apellido: string;
  activo: boolean;
  rolId?: number;
  rol?: Rol;
}

export interface Rol {
  id?: number;
  nombre: string;
  descripcion: string;
}

export interface DashboardStats {
  totalEquinos: number;
  totalPropietarios: number;
  totalCampeonatos: number;
  totalUsuarios: number;
  campeonatosActivos: number;
  campeonatosProximos: number;
}
