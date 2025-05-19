import { CONFIG } from '../config.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const productoService = {
    async listarProductos() {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/producto?select=*`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.status}`);
        }
        
        return await response.json();
    },
    
    async obtenerProducto(id) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/producto?id_pro=eq.${id}&select=*`, {
            headers: CONFIG.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener producto: ${response.status}`);
        }
        
        const productos = await response.json();
        
        if (productos.length === 0) {
            throw new Error("No se encontró el producto");
        }
        
        return productos[0];
    },
    
    async crearProducto(datos) {
        if (!datos.id_pro) {
            datos.id_pro = uuidv4();
        }
        
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/producto`, {
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
    
    async actualizarProducto(id, datos) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/producto?id_pro=eq.${id}`, {
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
    
    async eliminarProducto(id) {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/producto?id_pro=eq.${id}`, {
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