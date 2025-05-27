import { CONFIG } from '../config.js';

/**
 * Servicio para gestionar operaciones con mascotas
 */
class PetService {
    /**
     * Obtiene todas las mascotas
     * @returns {Promise<Array>} Arreglo de mascotas
     */
    async listarMascotas() {
        try {
            const response = await fetch(`${CONFIG.API_URL}/pet.php`, {
                headers: CONFIG.getHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`Error al obtener mascotas: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error en listarMascotas:", error);
            throw error;
        }
    }
    
    /**
     * Obtiene una mascota específica
     * @param {string} id ID de la mascota
     * @returns {Promise<Object>} Datos de la mascota
     */
    async obtenerMascota(id) {
        const response = await fetch(`${CONFIG.API_URL}/pet.php?id=${id}`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener mascota: ${response.status}`);
        }
        
        const mascota = await response.json();
        if (mascota.error) {
            throw new Error(mascota.error);
        }
        
        return mascota;
    }
    
    /**
     * Crea una nueva mascota
     * @param {Object} datos Datos de la nueva mascota
     * @returns {Promise<Object>} Mascota creada
     */
    async crearMascota(datos) {
        const response = await fetch(`${CONFIG.API_URL}/pet.php`, {
            method: 'POST',
            headers: CONFIG.getHeaders(),
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`Error al crear mascota: ${response.status}`);
        }
        
        const resultado = await response.json();
        if (resultado.error) {
            throw new Error(resultado.error);
        }
        
        return resultado;
    }
    
    /**
     * Actualiza una mascota existente
     * @param {string} id ID de la mascota
     * @param {Object} datos Datos actualizados
     * @returns {Promise<Object>} Mascota actualizada
     */
    async actualizarMascota(id, datos) {
        // Asegurarnos de incluir el ID en los datos
        datos.id_pet = id;
        
        const response = await fetch(`${CONFIG.API_URL}/pet.php`, {
            method: 'PUT',
            headers: CONFIG.getHeaders(),
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`Error al actualizar mascota: ${response.status}`);
        }
        
        const resultado = await response.json();
        if (resultado.error) {
            throw new Error(resultado.error);
        }
        
        return resultado;
    }
    
    /**
     * Elimina una mascota
     * @param {string} id ID de la mascota a eliminar
     * @returns {Promise<boolean>} True si se eliminó correctamente
     */
    async eliminarMascota(id) {
        const response = await fetch(`${CONFIG.API_URL}/pet.php?id=${id}`, {
            method: 'DELETE',
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al eliminar mascota: ${response.status}`);
        }
        
        const resultado = await response.json();
        if (resultado.error) {
            throw new Error(resultado.error);
        }
        
        return true;
    }
}

export const petService = new PetService();