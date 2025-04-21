import { productoService } from "../service/producto-service.js";

const crearNuevaFila = (nombre, precio, descripcion, id) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td> 
        <td>${precio}</td>
        <td>${descripcion}</td>
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

    const botonEliminar = fila.querySelector('button');
    botonEliminar.addEventListener('click', () => {
        const id = botonEliminar.id;
        productoService.eliminarProducto(id)
            .then(() => {
                alert("Producto eliminado con éxito");
                // Recargar la página para actualizar la lista
                window.location.reload();
            })
            .catch(error => {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar el producto");
            });
    });

    return fila;
};

const table = document.querySelector('[data-table]');

// Cargar productos al iniciar la página
productoService.listaProductos()
    .then((productos) => {
        if (productos.length === 0) {
            table.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos registrados</td></tr>';
            return;
        }
        
        productos.forEach(({ nombre, precio, descripcion, id }) => {
            const nuevaFila = crearNuevaFila(nombre, precio, descripcion, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch((error) => {
        console.error("Error al cargar productos:", error);
        table.innerHTML = '<tr><td colspan="4" class="text-center">Error al cargar los productos</td></tr>';
    });