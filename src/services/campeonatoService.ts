import { api } from '@/lib/api';
import { Campeonato } from '@/types';

export const campeonatoService = {
  getAll: async (): Promise<Campeonato[]> => {
    const response = await api.get('/campeonatos');
    return response.data;
  },

  getById: async (id: number): Promise<Campeonato> => {
    const response = await api.get(`/campeonatos/${id}`);
    return response.data;
  },

  create: async (data: Campeonato): Promise<Campeonato> => {
    const response = await api.post('/campeonatos', data);
    return response.data;
  },

  update: async (id: number, data: Campeonato): Promise<Campeonato> => {
    const response = await api.put(`/campeonatos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/campeonatos/${id}`);
  },
};
