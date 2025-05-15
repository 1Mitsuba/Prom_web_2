// Importar dependencias si es necesario
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Configuración de Supabase
const SUPABASE_URL = 'https://fqxjajxbjlnyrdvdofrq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeGphanhiamxueXJkdmRvZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDg1OTUsImV4cCI6MjA2MjYyNDU5NX0.tmC35WfvvFGwfYaOvBDLLmKVmGtq9cU-ojk2H4EHyV8';
const API_URL = `${SUPABASE_URL}/rest/v1/pet`;
const HEADER = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

// Función para listar mascotas
const listarMascotas = async () => {
    try {
        const response = await fetch(`${API_URL}?select=*`, {
            headers: HEADER
        });
        
        console.log('Respuesta listarMascotas:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al listar mascotas`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en listarMascotas:', error);
        throw error;
    }
};

// Función para obtener detalle de una mascota
const detalleMascota = async (id) => {
    try {
        const response = await fetch(`${API_URL}?id_pet=eq.${id}&select=*`, {
            headers: HEADER
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al obtener detalle de mascota`);
        }
        
        const datos = await response.json();
        return datos[0]; // Devolver solo el primer registro
    } catch (error) {
        console.error('Error en detalleMascota:', error);
        throw error;
    }
};

// Función para crear mascota
const crearMascota = async (nombre, raza, edad, id_cliente) => {
    try {
        // Usar la biblioteca UUID importada
        const id_pet = uuidv4(); // Usamos la función importada
        
        const mascota = {
            id_pet: id_pet,
            nombre,
            raza,
            edad: parseInt(edad) || 0,
            id: id_cliente // Relación con el cliente
        };
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify(mascota)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al crear mascota`);
        }
        
        return mascota;
    } catch (error) {
        console.error('Error en crearMascota:', error);
        throw error;
    }
};

// Función para actualizar mascota
const actualizarMascota = async (id, nombre, raza, edad, id_cliente) => {
    try {
        const mascota = {
            nombre,
            raza,
            edad: parseInt(edad) || 0
        };
        
        // Solo incluir id_cliente si se proporciona
        if (id_cliente) {
            mascota.id = id_cliente;
        }
        
        const response = await fetch(`${API_URL}?id_pet=eq.${id}`, {
            method: 'PATCH',
            headers: HEADER,
            body: JSON.stringify(mascota)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al actualizar mascota`);
        }
        
        return true;
    } catch (error) {
        console.error('Error en actualizarMascota:', error);
        throw error;
    }
};

// Función para eliminar mascota
const eliminarMascota = async (id) => {
    try {
        const response = await fetch(`${API_URL}?id_pet=eq.${id}`, {
            method: 'DELETE',
            headers: HEADER
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status} al eliminar mascota`);
        }
        
        return true;
    } catch (error) {
        console.error('Error en eliminarMascota:', error);
        throw error;
    }
};

export const petService = {
    listarMascotas,
    detalleMascota,
    crearMascota,
    actualizarMascota,
    eliminarMascota
};