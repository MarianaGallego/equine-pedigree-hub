import { api } from '@/lib/api';
import { Usuario } from '@/types';

export const usuarioService = {
  getAll: async (): Promise<Usuario[]> => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  getById: async (id: number): Promise<Usuario> => {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  },

  create: async (data: Usuario): Promise<Usuario> => {
    const response = await api.post('/usuario', data);
    return response.data;
  },

  update: async (id: number, data: Usuario): Promise<Usuario> => {
    const response = await api.put(`/usuario/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/usuario/${id}`);
  },
};
