import { productoService } from '../../services/producto-service.js';
import { mostrarMensaje, registrarActividad } from '../../utils.js';

// Variables globales
let productos = [];
const tablaProductos = document.getElementById('tabla-productos');
const resultElement = document.getElementById('result');

/**
 * Función para mostrar productos en la tabla
 */
function mostrarProductos() {
    if (!tablaProductos) return;
    
    // Limpiar tabla
    tablaProductos.innerHTML = '';
    
    if (productos.length === 0) {
        tablaProductos.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No hay productos registrados</td>
            </tr>
        `;
        return;
    }
    
    // Crear filas para cada producto
    productos.forEach(producto => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${parseFloat(producto.precio).toFixed(2)}</td>
            <td>${producto.descripcion || 'Sin descripción'}</td>
            <td>
                <div class="table-actions">
                    <a href="./editar_producto.html?id=${producto.id}" class="btn-edit">
                        <i class="fas fa-edit"></i> Editar
                    </a>
                    <button class="btn-delete" 
                            data-id="${producto.id}" 
                            data-name="${producto.nombre}"
                            onclick="confirmarEliminacion('${producto.id}', '${producto.nombre}')">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        
        tablaProductos.appendChild(row);
    });
}

/**
 * Función para cargar productos desde el servidor
 */
async function cargarProductos() {
    try {
        // Mostrar mensaje de carga
        mostrarMensaje("Cargando productos...", false);
        
        // Obtener productos del servicio
        productos = await productoService.listarProductos();
        
        // Mostrar productos en la tabla
        mostrarProductos();
        
        // Ocultar mensaje de carga
        if (resultElement) {
            resultElement.style.display = 'none';
        }
        
        // Verificar si hay un mensaje en la URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('created')) {
            mostrarMensaje("Producto creado con éxito", false, true);
        } else if (urlParams.has('updated')) {
            mostrarMensaje("Producto actualizado con éxito", false, true);
        } else if (urlParams.has('deleted')) {
            mostrarMensaje("Producto eliminado con éxito", false, true);
        }
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al cargar productos: " + error.message, true);
    }
}

/**
 * Función para eliminar un producto
 */
window.confirmarEliminacion = function(id, nombre) {
    if (confirm(`¿Estás seguro que deseas eliminar el producto "${nombre}"?`)) {
        eliminarProducto(id, nombre);
    }
};

async function eliminarProducto(id, nombre) {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Eliminando producto...", false);
        
        // Eliminar producto
        await productoService.eliminarProducto(id);
        
        // Registrar actividad
        registrarActividad('eliminar', 'producto', nombre);
        
        // Actualizar lista de productos
        productos = productos.filter(producto => producto.id !== id);
        mostrarProductos();
        
        // Mostrar mensaje de éxito
        mostrarMensaje("Producto eliminado con éxito", false, true);
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al eliminar producto: " + error.message, true);
    }
}

// Cargar productos cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarProductos);