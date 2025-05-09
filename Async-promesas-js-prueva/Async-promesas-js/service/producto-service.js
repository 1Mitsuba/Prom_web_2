// IMPORTANTE: Cambia esta línea para asegurar la importación correcta de UUID
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Define la constante con la URL de la API - VERIFICA QUE SEA CORRECTA
const API_BASE_URL = 'http://localhost/api/productos.php';

// Servicio para obtener todos los productos
const listaProductos = () => {
  console.log("Solicitando lista de productos");
  return fetch(API_BASE_URL)
    .then(respuesta => {
      console.log("Respuesta de API productos:", respuesta.status);
      if(!respuesta.ok) {
        throw new Error(`Error al listar productos: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then(data => {
      console.log("Datos de productos recibidos:", data.length || 'sin datos');
      return Array.isArray(data) ? data : [];
    })
    .catch(error => {
      console.error("Error en listaProductos:", error);
      return [];
    });
};

// Servicio para crear un nuevo producto
const crearProducto = (nombre, precio, descripcion) => {
    // IMPORTANTE: Usamos uuidv4() para generar un ID único
    const id = uuidv4();
    
    console.log("Creando producto:", { id, nombre, precio, descripcion });
    
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            nombre,
            precio,
            descripcion
        })
    })
    .then(response => {
        console.log("Respuesta del servidor:", response);
        if (!response.ok) throw new Error('Error al crear producto');
        return response.json();
    });
};

const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error('Error al eliminar producto');
        return response.json();
    });
};

const detalleProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener producto');
            return response.json();
        });
};

const actualizarProducto = (id, nombre, precio, descripcion) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nombre, precio, descripcion })
    }).then(response => {
        if (!response.ok) throw new Error('Error al actualizar producto');
        return response.json();
    });
};

export const productoService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto
};