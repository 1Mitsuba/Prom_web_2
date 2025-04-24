/**
 * Servicio base para realizar peticiones a la API
 */

const API_URL = "http://localhost:3000";

export const apiService = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al obtener ${endpoint}:`, error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al crear ${endpoint}:`, error);
      throw error;
    }
  },

  update: async (endpoint, id, data) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al actualizar ${endpoint}/${id}:`, error);
      throw error;
    }
  },

  delete: async (endpoint, id) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error(`Error al eliminar ${endpoint}/${id}:`, error);
      throw error;
    }
  },
};