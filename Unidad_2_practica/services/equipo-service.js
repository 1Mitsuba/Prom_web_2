import { apiService } from './api-service.js';

export const equipoService = {
  listar: async () => {
    return await apiService.get('equipos');
  },
  
  obtener: async (id) => {
    return await apiService.get(`equipos/${id}`);
  },
  
  crear: async (equipo) => {
    if (!equipo.id) {
      equipo.id = 'eq' + Date.now();
    }
    return await apiService.post('equipos', equipo);
  },
  
  actualizar: async (id, equipo) => {
    return await apiService.update('equipos', id, equipo);
  },
  
  eliminar: async (id) => {
    return await apiService.delete('equipos', id);
  }
};