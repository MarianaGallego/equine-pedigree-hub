import { api } from '@/lib/api';
import { ArbolGenealogico } from '@/types';

export const arbolService = {
  getAll: async (): Promise<ArbolGenealogico[]> => {
    const response = await api.get('/arboles-genealogicos');
    return response.data;
  },

  getById: async (id: number): Promise<ArbolGenealogico> => {
    const response = await api.get(`/arboles-genealogicos/${id}`);
    return response.data;
  },

  getByEquinoId: async (equinoId: number): Promise<ArbolGenealogico> => {
    const response = await api.get(`/arboles-genealogicos/equino/${equinoId}`);
    return response.data;
  },

  create: async (data: ArbolGenealogico): Promise<ArbolGenealogico> => {
    const response = await api.post('/arboles-genealogicos', data);
    return response.data;
  },

  update: async (id: number, data: ArbolGenealogico): Promise<ArbolGenealogico> => {
    const response = await api.put(`/arboles-genealogicos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/arboles-genealogicos/${id}`);
  },
};
