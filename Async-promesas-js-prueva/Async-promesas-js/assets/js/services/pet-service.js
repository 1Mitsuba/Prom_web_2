import { CONFIG } from '../config.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const petService = {
    /**
     * Obtiene todas las mascotas
     * @returns {Promise<Array>} Arreglo de mascotas
     */
    async listarMascotas() {
        try {
            const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/pet?select=*,cliente:id(nombre)`, {
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
    },
    
    /**
     * Obtiene una mascota por su ID
     * @param {string} id ID de la mascota
     * @returns {Promise<Object>} Datos de la mascota
     */
    async obtenerMascota(id) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/pet?id_pet=eq.${id}&select=*`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener mascota: ${response.status}`);
        }
        
        const mascotas = await response.json();
        
        if (mascotas.length === 0) {
            throw new Error("No se encontró la mascota");
        }
        
        return mascotas[0];
    },
    
    /**
     * Crea una nueva mascota
     * @param {Object} datos Datos de la mascota
     * @returns {Promise<Object>} Mascota creada
     */
    async crearMascota(datos) {
        // Generar un ID único para la mascota si no tiene
        if (!datos.id_pet) {
            datos.id_pet = uuidv4();
        }
        
        // Asegurarnos de que estamos usando la columna correcta para el dueño
        // La columna en la base de datos es 'id'
        if (datos.dueno) {
            datos.id = datos.dueno;
            delete datos.dueno;
        }
        if (datos.cliente) {
            datos.id = datos.cliente;
            delete datos.cliente;
        }
        
        console.log("Datos de mascota a crear:", datos);
        
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/pet`, {
            method: 'POST',
            headers: {
                ...CONFIG.getHeaders(),
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        return await response.json();
    },
    
    /**
     * Actualiza una mascota existente
     * @param {string} id ID de la mascota
     * @param {Object} datos Datos actualizados
     * @returns {Promise<Object>} Mascota actualizada
     */
    async actualizarMascota(id, datos) {
        // Asegurarnos de que estamos usando la columna correcta para el dueño
        // La columna en la base de datos es 'id'
        if (datos.dueno) {
            datos.id = datos.dueno;
            delete datos.dueno;
        }
        if (datos.cliente) {
            datos.id = datos.cliente;
            delete datos.cliente;
        }
        
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/pet?id_pet=eq.${id}`, {
            method: 'PATCH',
            headers: {
                ...CONFIG.getHeaders(),
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        return await response.json();
    },
    
    /**
     * Elimina una mascota
     * @param {string} id ID de la mascota
     * @returns {Promise<boolean>} Éxito de la operación
     */
    async eliminarMascota(id) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/pet?id_pet=eq.${id}`, {
            method: 'DELETE',
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        return true;
    }
};