import { CONFIG } from '../config.js';

/**
 * Servicio para gestionar operaciones con productos
 */
class ProductoService {
    /**
     * Obtiene todos los productos
     * @returns {Promise<Array>} Arreglo de productos
     */
    async listarProductos() {
        const response = await fetch(`${CONFIG.API_URL}/producto.php`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.status}`);
        }
        
        return await response.json();
    }
    
    /**
     * Obtiene un producto específico
     * @param {string} id ID del producto
     * @returns {Promise<Object>} Datos del producto
     */
    async obtenerProducto(id) {
        const response = await fetch(`${CONFIG.API_URL}/producto.php?id=${id}`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener producto: ${response.status}`);
        }
        
        const producto = await response.json();
        if (producto.error) {
            throw new Error(producto.error);
        }
        
        return producto;
    }
    
    /**
     * Crea un nuevo producto
     * @param {Object} datos Datos del nuevo producto
     * @returns {Promise<Object>} Producto creado
     */
    async crearProducto(datos) {
        const response = await fetch(`${CONFIG.API_URL}/producto.php`, {
            method: 'POST',
            headers: CONFIG.getHeaders(),
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`Error al crear producto: ${response.status}`);
        }
        
        const resultado = await response.json();
        if (resultado.error) {
            throw new Error(resultado.error);
        }
        
        return resultado;
    }
    
    /**
     * Actualiza un producto existente
     * @param {string} id ID del producto
     * @param {Object} datos Nuevos datos
     * @returns {Promise<Object>} Datos actualizados
     */
    async actualizarProducto(id, datos) {
        // Asegurar que el ID esté incluido en los datos
        datos.id_pro = id;
        
        const response = await fetch(`${CONFIG.API_URL}/producto.php`, {
            method: 'PUT',
            headers: CONFIG.getHeaders(),
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`Error al actualizar producto: ${response.status}`);
        }
        
        const resultado = await response.json();
        if (resultado.error) {
            throw new Error(resultado.error);
        }
        
        return resultado;
    }
    
    /**
     * Elimina un producto
     * @param {string} id ID del producto
     * @returns {Promise<boolean>} True si se eliminó correctamente
     */
    async eliminarProducto(id) {
        const response = await fetch(`${CONFIG.API_URL}/producto.php?id=${id}`, {
            method: 'DELETE',
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al eliminar producto: ${response.status}`);
        }
        
        const resultado = await response.json();
        if (resultado.error) {
            throw new Error(resultado.error);
        }
        
        return true;
    }
}

export const productoService = new ProductoService();