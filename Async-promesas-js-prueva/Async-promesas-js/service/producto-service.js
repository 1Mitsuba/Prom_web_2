// Importar dependencias
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Configuración de Supabase
const SUPABASE_URL = 'https://fqxjajxbjlnyrdvdofrq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeGphanhiamxueXJkdmRvZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDg1OTUsImV4cCI6MjA2MjYyNDU5NX0.tmC35WfvvFGwfYaOvBDLLmKVmGtq9cU-ojk2H4EHyV8';
const API_URL = `${SUPABASE_URL}/rest/v1/producto`;
const HEADER = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

// Función para listar productos
const listarProductos = async (terminoBusqueda = '') => {
    try {
        let url = `${API_URL}?select=*`;
        
        // Si hay término de búsqueda, filtrar por nombre
        if (terminoBusqueda) {
            url += `&nombre=ilike.*${terminoBusqueda}*`;
        }
        
        const response = await fetch(url, {
            headers: HEADER
        });
        
        console.log('Respuesta listarProductos:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al listar productos`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en listarProductos:', error);
        throw error;
    }
};

// Función para crear producto
const crearProducto = async (nombre, precio, descripcion) => {
    try {
        // Usar la biblioteca UUID importada
        const id_pro = uuidv4();
        
        const producto = {
            id_pro,
            nombre,
            precio: parseFloat(precio) || 0,
            descripcion: descripcion || null
        };
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify(producto)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al crear producto`);
        }
        
        return producto;
    } catch (error) {
        console.error('Error en crearProducto:', error);
        throw error;
    }
};

// Función para actualizar un producto
const actualizarProducto = async (id, nombre, precio, descripcion) => {
    try {
        const producto = {
            nombre,
            precio: parseFloat(precio) || 0,
            descripcion: descripcion || null
        };
        
        const response = await fetch(`${API_URL}?id_pro=eq.${id}`, {
            method: 'PATCH',
            headers: HEADER,
            body: JSON.stringify(producto)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al actualizar producto`);
        }
        
        return true;
    } catch (error) {
        console.error('Error en actualizarProducto:', error);
        throw error;
    }
};

// Función para eliminar producto
const eliminarProducto = async (id) => {
    try {
        const response = await fetch(`${API_URL}?id_pro=eq.${id}`, {
            method: 'DELETE',
            headers: HEADER
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al eliminar producto`);
        }
        
        return true;
    } catch (error) {
        console.error('Error en eliminarProducto:', error);
        throw error;
    }
};

export const productoService = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};