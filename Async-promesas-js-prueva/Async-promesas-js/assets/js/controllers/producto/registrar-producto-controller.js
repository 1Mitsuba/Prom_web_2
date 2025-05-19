import { productoService } from '../../services/producto-service.js';
import { mostrarMensaje, registrarActividad } from '../../utils.js';

// Elementos del formulario
const productoForm = document.getElementById('productoForm');

// Manejar envío del formulario
productoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value.trim();
        
        // Validaciones
        if (!nombre) {
            throw new Error("El nombre del producto es obligatorio");
        }
        
        if (!precio || isNaN(precio) || parseFloat(precio) < 0) {
            throw new Error("El precio debe ser un número positivo");
        }
        
        // Crear objeto producto
        const producto = {
            nombre,
            precio: parseFloat(precio),
            descripcion
        };
        
        console.log("Datos a registrar:", producto);
        
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Registrando producto...", false);
        
        // Registrar producto
        const nuevoProducto = await productoService.crearProducto(producto);
        
        // Registrar actividad
        registrarActividad('crear', 'producto', producto.nombre);
        
        // Mensaje y redirección
        mostrarMensaje("Producto registrado con éxito", false, true, './lista_productos.html?created=true');
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al registrar producto: " + error.message, true);
    }
});