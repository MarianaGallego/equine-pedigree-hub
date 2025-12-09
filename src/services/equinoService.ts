import { api } from '@/lib/api';
import { Equino } from '@/types';

export const equinoService = {
  getAll: async (): Promise<Equino[]> => {
    const response = await api.get('/equinos');
    return response.data;
  },

  getById: async (id: number): Promise<Equino> => {
    const response = await api.get(`/equino/${id}`);
    return response.data;
  },

  create: async (data: Equino): Promise<Equino> => {
    const response = await api.post('/equino', data);
    return response.data;
  },

  update: async (id: number, data: Equino): Promise<Equino> => {
    const response = await api.put(`/equino/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/equino/${id}`);
  },
};
