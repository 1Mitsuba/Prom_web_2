/**
 * Controlador para la página de edición de productos
 * Gestiona el proceso de actualizar datos de productos existentes
 */

// Importamos el servicio necesario para operaciones con productos
import { productoService } from "../service/producto-service.js";

// Obtenemos la referencia al formulario de edición
const formulario = document.querySelector('[data-form]');

// Función para obtener y mostrar la información del producto a editar
const obtenerInformacion = () => {
    // Obtenemos la URL actual
    const url = new URL(window.location);
    // Extraemos el ID del producto de los parámetros de la URL
    const id = url.searchParams.get('id');
    
    // Verificamos si se proporcionó un ID válido
    if (id === null) {
        // Si no hay ID, redirigimos a la lista de productos
        window.location.href = '../screens/lista_productos.html';
        return;
    }
    
    // Obtenemos referencias a los campos del formulario
    const nombre = document.querySelector('[data-nombre]');
    const precio = document.querySelector('[data-precio]');
    const descripcion = document.querySelector('[data-descripcion]');
    
    // Cargamos los datos actuales del producto
    productoService.obtenerProducto(id)
        .then(producto => {
            // Verificamos si se encontró el producto
            if (!producto) {
                // Si no se encontró, redirigimos a la lista
                alert("Producto no encontrado");
                window.location.href = '../screens/lista_productos.html';
                return;
            }
            
            // Rellenamos los campos del formulario con los datos obtenidos
            nombre.value = producto.nombre;
            precio.value = producto.precio;
            descripcion.value = producto.descripcion;
        })
        .catch(error => {
            // Manejo de errores al cargar los datos
            console.error("Error al cargar producto:", error);
            alert("No se pudo cargar la información del producto");
            window.location.href = '../screens/lista_productos.html';
        });
    
    // Configuramos el evento para el envío del formulario
    formulario.addEventListener('submit', (evento) => {
        // Prevenimos el comportamiento predeterminado del formulario
        evento.preventDefault();
        
        // Validamos que los campos contengan valores adecuados
        if (!validarCampos(nombre.value, precio.value, descripcion.value)) {
            return; // Si no pasan la validación, detenemos el proceso
        }
        
        // Llamamos al servicio para actualizar el producto
        productoService.actualizarProducto(
            nombre.value,      // Nombre actualizado
            precio.value,      // Precio actualizado
            descripcion.value, // Descripción actualizada
            id                 // ID del producto que estamos editando
        )
        .then(() => {
            // Redirigimos a la página de edición completada
            window.location.href = '../screens/edicion_producto_concluida.html';
        })
        .catch(error => {
            // Manejo de errores en caso de fallo
            console.error("Error al actualizar:", error);
            alert("No se pudo actualizar el producto");
        });
    });
};

// Función para validar los campos del formulario
const validarCampos = (nombre, precio, descripcion) => {
    // Validamos que el nombre no esté vacío
    if (!nombre.trim()) {
        alert("El nombre del producto es obligatorio");
        return false;
    }
    
    // Validamos que el precio sea un número positivo
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
        alert("El precio debe ser un número positivo");
        return false;
    }
    
    // Validamos que la descripción tenga al menos 10 caracteres
    if (descripcion.trim().length < 10) {
        alert("La descripción debe tener al menos 10 caracteres");
        return false;
    }
    
    return true; // Si pasa todas las validaciones
};

// Iniciamos la carga de la información cuando cargue la página
obtenerInformacion();