// Servicio para manejar las operaciones de clientes

// URL base de la API con ruta absoluta (asegúrate de ajustar esto a tu entorno)
const API_URL = '/Async-promesas-js-prueva-copia/Async-promesas-js/api/api.php';

// Lista todos los clientes
const listaClientes = async () => {
    try {
        console.log("Realizando petición a:", API_URL);
        const respuesta = await fetch(API_URL);
        
        // Para depurar
        const text = await respuesta.text();
        console.log("Respuesta recibida:", text);
        
        // Intentar convertir a JSON manualmente
        try {
            const data = JSON.parse(text);
            return data;
        } catch (jsonError) {
            console.error("Error al parsear JSON:", jsonError);
            throw new Error(`Respuesta no válida: ${text.substring(0, 50)}...`);
        }
    } catch (error) {
        console.error("Error en listaClientes:", error);
        throw error;
    }
};

// Crear un nuevo cliente
const crearCliente = async (cliente) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error("Error en crearCliente:", error);
        throw error;
    }
};

// Eliminar un cliente
const eliminarCliente = async (id) => {
    try {
        const respuesta = await fetch(`${API_URL}?id=${id}`, {
            method: 'DELETE'
        });
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error("Error en eliminarCliente:", error);
        throw error;
    }
};

// Detalles de un cliente específico
const obtenerCliente = async (id) => {
    try {
        const respuesta = await fetch(`${API_URL}?id=${id}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error("Error en obtenerCliente:", error);
        throw error;
    }
};

// Actualizar un cliente
const actualizarCliente = async (id, cliente) => {
    try {
        cliente.id = id; // Asegurarse de que el cliente tenga el ID
        
        const respuesta = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error("Error en actualizarCliente:", error);
        throw error;
    }
};

export const clienteService = {
    listaClientes, // Mantén el nombre original, no cambies a listarClientes
    crearCliente,
    eliminarCliente,
    obtenerCliente, // Asegúrate de que este nombre coincide con el usado en los controllers
    actualizarCliente
};