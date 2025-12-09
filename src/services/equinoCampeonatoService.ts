import { api } from '@/lib/api';
import { Equino_Campeonato } from '@/types';

export const equinoCampeonatoService = {
  getAll: async (): Promise<Equino_Campeonato[]> => {
    const response = await api.get('/equino-campeonato');
    return response.data;
  },

  getById: async (id: number): Promise<Equino_Campeonato> => {
    const response = await api.get(`/equino-campeonato/${id}`);
    return response.data;
  },

  getByCampeonatoId: async (campeonatoId: number): Promise<Equino_Campeonato[]> => {
    const response = await api.get(`/equino-campeonato/campeonato/${campeonatoId}`);
    return response.data;
  },

  getByEquinoId: async (equinoId: number): Promise<Equino_Campeonato[]> => {
    const response = await api.get(`/equino-campeonato/equino/${equinoId}`);
    return response.data;
  },

  create: async (data: Equino_Campeonato): Promise<Equino_Campeonato> => {
    const response = await api.post('/equino-campeonato', data);
    return response.data;
  },

  update: async (id: number, data: Equino_Campeonato): Promise<Equino_Campeonato> => {
    const response = await api.put(`/equino-campeonato/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/equino-campeonato/${id}`);
  },
};
