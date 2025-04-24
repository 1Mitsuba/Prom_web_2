import { apiService } from './api-service.js';

export const usuarioService = {
  listar: async () => {
    return await apiService.get('usuarios');
  },
  
  obtener: async (id) => {
    return await apiService.get(`usuarios/${id}`);
  },
  
  crear: async (usuario) => {
    // Generar ID único si no viene
    if (!usuario.id) {
      usuario.id = 'u' + Date.now();
    }
    return await apiService.post('usuarios', usuario);
  },
  
  actualizar: async (id, usuario) => {
    return await apiService.update('usuarios', id, usuario);
  },
  
  eliminar: async (id) => {
    return await apiService.delete('usuarios', id);
  }
};