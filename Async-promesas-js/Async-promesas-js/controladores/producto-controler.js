/**
 * Controlador para la página de listado de productos
 * Gestiona la visualización y eliminación de productos
 */

// Importamos el servicio necesario para operaciones con productos
import { productoService } from "../service/producto-service.js";

// Función para crear una nueva fila para cada producto en la tabla
const crearNuevaFila = (nombre, precio, descripcion, id) => {
    // Creamos un elemento tr para la fila
    const fila = document.createElement('tr');
    
    // Formateamos el precio para mostrarlo como moneda
    const precioFormateado = `$${precio}`;
    
    // Limitamos la longitud de la descripción para visualización en tabla
    const descripcionCorta = descripcion.length > 50 
        ? descripcion.substring(0, 50) + "..." 
        : descripcion;
    
    // Definimos el contenido HTML de la fila con los datos del producto
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td> 
        <td>${precioFormateado}</td>
        <td>${descripcionCorta}</td>
        <td>
          <ul class="table__button-control">
            <li>
              <a href="../screens/editar_producto.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
            </li>
            <li>
              <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
            </li>
          </ul>
        </td>
    `;

    // Obtenemos el botón de eliminar dentro de la fila creada
    const botonEliminar = fila.querySelector('button');
    
    // Añadimos un evento click al botón de eliminar
    botonEliminar.addEventListener('click', () => {
        // Pedimos confirmación antes de eliminar
        const confirmar = confirm("¿Está seguro de que desea eliminar este producto?");
        
        // Si el usuario confirma, procedemos con la eliminación
        if (confirmar) {
            // Obtenemos el ID del producto a eliminar
            const id = botonEliminar.id;
            
            // Llamamos al servicio para eliminar el producto
            productoService.eliminarProducto(id)
                .then(() => {
                    // Mostramos un mensaje de éxito
                    alert("Producto eliminado con éxito");
                    // Recargamos la página para actualizar la lista
                    window.location.reload();
                })
                .catch(error => {
                    // Manejo de errores en caso de fallo
                    console.error("Error al eliminar:", error);
                    alert("No se pudo eliminar el producto");
                });
        }
    });

    // Devolvemos la fila completada
    return fila;
};

// Obtenemos la tabla donde mostraremos los productos
const table = document.querySelector('[data-table]');

// Cargamos todos los productos al iniciar la página
productoService.listaProductos()
    .then((productos) => {
        // Verificamos si hay productos para mostrar
        if (productos.length === 0) {
            // Si no hay productos, mostramos un mensaje
            table.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos registrados</td></tr>';
            return;
        }
        
        // Iteramos por cada producto para crear su fila en la tabla
        productos.forEach(({ nombre, precio, descripcion, id }) => {
            // Creamos una nueva fila con los datos del producto
            const nuevaFila = crearNuevaFila(nombre, precio, descripcion, id);
            // Añadimos la fila a la tabla
            table.appendChild(nuevaFila);
        });
    })
    .catch((error) => {
        // Manejo de errores al cargar la lista
        console.error("Error al cargar productos:", error);
        table.innerHTML = '<tr><td colspan="4" class="text-center">Error al cargar los productos</td></tr>';
    });