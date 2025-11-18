import { api } from '@/lib/api';
import { Propietario } from '@/types';

export const propietarioService = {
  getAll: async (): Promise<Propietario[]> => {
    const response = await api.get('/propietarios');
    return response.data;
  },

  getById: async (id: number): Promise<Propietario> => {
    const response = await api.get(`/propietarios/${id}`);
    return response.data;
  },

  create: async (data: Propietario): Promise<Propietario> => {
    const response = await api.post('/propietarios', data);
    return response.data;
  },

  update: async (id: number, data: Propietario): Promise<Propietario> => {
    const response = await api.put(`/propietarios/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/propietarios/${id}`);
  },
};
