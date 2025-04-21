/**
 * Controlador para la página de listado de clientes
 * Gestiona la visualización y eliminación de clientes
 */

// Importamos el servicio necesario para operaciones con clientes
import { clientService } from "../service/client-service.js";

// Función para crear una nueva fila para cada cliente en la tabla
const crearNuevaLinea = (nombre, email, id) => {
    // Creamos un elemento tr para la fila
    const linea = document.createElement("tr");
    
    // Definimos el contenido HTML de la fila con los datos del cliente
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    
    // Asignamos el contenido HTML a la fila
    linea.innerHTML = contenido;
    
    // Obtenemos el botón de eliminar dentro de la fila creada
    const btn = linea.querySelector("button");
    
    // Añadimos un evento click al botón de eliminar
    btn.addEventListener("click", () => {
        // Obtenemos el ID del cliente a eliminar
        const id = btn.id;
        
        // Llamamos al servicio para eliminar el cliente
        clientService.eliminarCliente(id)
            .then(respuesta => {
                // En caso de éxito, recargamos la página para ver los cambios
                window.location.reload();
            })
            .catch(err => alert("Ocurrió un error")); // Manejo básico de errores
    });
    
    // Devolvemos la fila completada
    return linea;
};

// Obtenemos la tabla donde mostraremos los clientes
const table = document.querySelector("[data-table]");

// Cargamos todos los clientes al iniciar la página
clientService.listaClientes()
    .then((data) => {
        // Iteramos por cada cliente para crear su fila en la tabla
        data.forEach(({ nombre, email, id }) => {
            // Creamos una nueva fila con los datos del cliente
            const nuevaLinea = crearNuevaLinea(nombre, email, id);
            // Añadimos la fila a la tabla
            table.appendChild(nuevaLinea);
        });
    })
    .catch((error) => alert("Ocurrió un error")); // Manejo básico de errores