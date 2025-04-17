import { clientService } from "../service/client-service.js";

// CORRECCIÓN: Añadir el parámetro id a la función
const crearNuevaFila = (nombre, email, id) => { //recibir nombre, email e id
    const file = document.createElement('tr');
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
    file.innerHTML = contenido;

    const btn = file.querySelector("button");
    btn.addEventListener('click', () => {
      const id = btn.id;
      clientService.eliminarCliente(id).then(respuesta => {
        alert("Eliminado");
      }).catch(error => alert("error"));
    });

    return file;
};

const table = document.querySelector('[data-table]');

clientService.listaClientes().then((data) => {
  data.forEach((perfil) => {
      // CORRECCIÓN: Pasar el id como tercer parámetro
      const nuevaFila = crearNuevaFila(perfil.nombre, perfil.email, perfil.id);
      table.appendChild(nuevaFila);
    });
}).catch((error) => {
    console.error("Error detallado:", error);
    alert("Error al cargar los clientes");
});