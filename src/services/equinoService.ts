import { api } from '@/lib/api';
import { Equino } from '@/types';

export const equinoService = {
  getAll: async (): Promise<Equino[]> => {
    const response = await api.get('/equinos');
    return response.data;
  },

  getById: async (id: number): Promise<Equino> => {
    const response = await api.get(`/equinos/${id}`);
    return response.data;
  },

  create: async (data: Equino): Promise<Equino> => {
    const response = await api.post('/equinos', data);
    return response.data;
  },

  update: async (id: number, data: Equino): Promise<Equino> => {
    const response = await api.put(`/equinos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/equinos/${id}`);
  },
};
