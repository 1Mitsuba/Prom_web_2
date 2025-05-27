import { productoService } from '../../services/producto-service.js';
import { mostrarMensaje, obtenerParametroURL, registrarActividad } from '../../utils.js';

// Elementos del formulario
const productoForm = document.getElementById('productoForm');
const idInput = document.getElementById('id_pro');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const descripcionInput = document.getElementById('descripcion');
const resultElement = document.getElementById('result');

// Obtener ID del producto de la URL
const id = obtenerParametroURL('id');

// Verificar si se proporcionó un ID
if (!id) {
    window.location.href = "./lista_productos.html";
}

/**
 * Carga los datos del producto
 */
async function cargarProducto() {
    try {
        // Mostrar mensaje de carga
        mostrarMensaje("Cargando producto...", false);
        
        // Obtener producto del servicio
        const producto = await productoService.obtenerProducto(id);
        console.log("Producto cargado:", producto);
        
        // Llenar el formulario
        idInput.value = producto.id_pro;
        nombreInput.value = producto.nombre || '';
        precioInput.value = producto.precio || '';
        descripcionInput.value = producto.descripcion || '';
        
        // Ocultar mensaje de carga
        resultElement.style.display = 'none';
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al cargar producto: " + error.message, true);
    }
}

// Cargar producto cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarProducto);

// Manejar envío del formulario
productoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Validar el formulario
        if (!nombreInput.value.trim()) {
            throw new Error("El nombre es obligatorio");
        }
        
        if (!precioInput.value || isNaN(precioInput.value) || parseFloat(precioInput.value) < 0) {
            throw new Error("El precio debe ser un número positivo");
        }
        
        // Crear objeto producto con los datos del formulario
        const producto = {
            nombre: nombreInput.value.trim(),
            precio: parseFloat(precioInput.value),
            descripcion: descripcionInput.value.trim()
        };
        
        console.log("Datos a actualizar:", producto);
        
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Actualizando producto...", false);
        
        // Actualizar producto
        await productoService.actualizarProducto(id, producto);
        
        // Registrar actividad
        registrarActividad('editar', 'producto', producto.nombre);
        
        // Mostrar mensaje y redireccionar
        mostrarMensaje("Producto actualizado con éxito", false, true, './lista_productos.html?updated=true');
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al actualizar producto: " + error.message, true);
    }
});