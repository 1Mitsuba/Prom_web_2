/**
 * Controlador para la página de listado de mascotas
 * Gestiona la visualización y eliminación de mascotas
 */

// Importamos el servicio necesario para operaciones con mascotas
import { petService } from "../service/pet-service.js";

// Función para crear una nueva fila para cada mascota en la tabla
const crearNuevaFila = (nombre, raza, edad, propietario, id) => {
    // Creamos un elemento tr para la fila
    const fila = document.createElement('tr');
    
    // Definimos el contenido HTML de la fila con los datos de la mascota
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td> 
        <td>${raza}</td>
        <td>${edad}</td>
        <td>${propietario}</td>
        <td>
          <ul class="table__button-control">
            <li>
              <a href="../screens/editar_pet.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
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
        // Obtenemos el ID de la mascota a eliminar
        const id = botonEliminar.id;
        
        // Llamamos al servicio para eliminar la mascota
        petService.eliminarPet(id)
            .then(() => {
                // Mostramos un mensaje de éxito
                alert("Mascota eliminada con éxito");
                // Recargamos la página para actualizar la lista
                window.location.reload();
            })
            .catch(error => {
                // Manejo de errores en caso de fallo
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar la mascota");
            });
    });

    // Devolvemos la fila completada
    return fila;
};

// Obtenemos la tabla donde mostraremos las mascotas
const table = document.querySelector('[data-table]');

// Cargamos todas las mascotas al iniciar la página
petService.listaPets()
    .then((pets) => {
        // Verificamos si hay mascotas para mostrar
        if (pets.length === 0) {
            // Si no hay mascotas, mostramos un mensaje
            table.innerHTML = '<tr><td colspan="5" class="text-center">No hay mascotas registradas</td></tr>';
            return;
        }
        
        // Iteramos por cada mascota para crear su fila en la tabla
        pets.forEach(({ nombre, raza, edad, propietario, id }) => {
            // Creamos una nueva fila con los datos de la mascota
            const nuevaFila = crearNuevaFila(nombre, raza, edad, propietario, id);
            // Añadimos la fila a la tabla
            table.appendChild(nuevaFila);
        });
    })
    .catch((error) => {
        // Manejo de errores al cargar la lista
        console.error("Error al cargar mascotas:", error);
        table.innerHTML = '<tr><td colspan="5" class="text-center">Error al cargar las mascotas</td></tr>';
    });