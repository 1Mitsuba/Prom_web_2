import { apiService } from './api-service.js';

export const tareaService = {
  listar: async () => {
    return await apiService.get('tareas');
  },
  
  obtener: async (id) => {
    return await apiService.get(`tareas/${id}`);
  },
  
  crear: async (tarea) => {
    if (!tarea.id) {
      tarea.id = 't' + Date.now();
    }
    return await apiService.post('tareas', tarea);
  },
  
  actualizar: async (id, tarea) => {
    return await apiService.update('tareas', id, tarea);
  },
  
  eliminar: async (id) => {
    return await apiService.delete('tareas', id);
  }
};