import { CONFIG } from '../config.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const clienteService = {
    /**
     * Obtiene todos los clientes
     * @returns {Promise<Array>} Arreglo de clientes
     */
    async listarClientes() {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/cliente?select=*`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener clientes: ${response.status}`);
        }
        
        return await response.json();
    },
    
    /**
     * Obtiene un cliente por su ID
     * @param {string} id ID del cliente
     * @returns {Promise<Object>} Datos del cliente
     */
    async obtenerCliente(id) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/cliente?id=eq.${id}&select=*`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener cliente: ${response.status}`);
        }
        
        const clientes = await response.json();
        
        if (clientes.length === 0) {
            throw new Error("No se encontró el cliente");
        }
        
        return clientes[0];
    },
    
    /**
     * Crea un nuevo cliente
     * @param {Object} datos Datos del cliente a crear
     * @returns {Promise<Object>} Datos del cliente creado
     */
    async crearCliente(datos) {
        // Asegurar que tenga un ID
        if (!datos.id) {
            datos.id = uuidv4();
        }
        
        // CORRECCIÓN: Renombrar email a emal en los datos enviados
        if (datos.email) {
            datos.emal = datos.email;
            delete datos.email;  // Eliminar el campo email
        }
        
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/cliente`, {
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
     * Actualiza un cliente existente
     * @param {string} id ID del cliente a actualizar
     * @param {Object} datos Nuevos datos del cliente
     * @returns {Promise<Object>} Datos del cliente actualizado
     */
    async actualizarCliente(id, datos) {
        // CORRECCIÓN: Renombrar email a emal en los datos enviados
        if (datos.email) {
            datos.emal = datos.email;
            delete datos.email;  // Eliminar el campo email
        }
        
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/cliente?id=eq.${id}`, {
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
     * Elimina un cliente
     * @param {string} id ID del cliente a eliminar
     * @returns {Promise<boolean>} Verdadero si se eliminó correctamente
     */
    async eliminarCliente(id) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/cliente?id=eq.${id}`, {
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