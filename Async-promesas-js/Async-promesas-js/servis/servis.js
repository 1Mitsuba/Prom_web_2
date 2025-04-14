const crearNuevaFila=(Nombre,email) => { //resepsionar datos
    const file = document.createElement('tr'); //crear nueva fila en la tabla
    //guardo los datos en la fila 
    const contenido = `
        <td class="td" data-td>
            ${Nombre}
        </td> 
        <td>${email}</td>
            <td>
              <ul class="table__button-control">
                <li>
                  <a
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                  >
                </li>
                <li>
                  <button
                    class="simple-button simple-button--delete"
                    type="button"
                  >
                    Eliminar
                  </button>
                </li>
              </ul>
            </td>
        `; //contenido de la tabla
    file.innerHTML = contenido; //agregar contenido a la fila
    return file; //devolver la fila
};

const table = document.querySelector('[data-table]'); //seleccionar la tabla

const listaClientes=() => { //funcion para listar los clientes
  const promesa = new Promise((resolve, reject) => { //crear una nueva promesa
      const http = new XMLHttpRequest(); //crear un nuevo objeto XMLHttpRequest variale con request http y xml
      http.open('GET', 'http://localhost:3000/perfil'); //abrir la conexion
      http.send(); //enviar la conexion
      http.onload = () => { //cuando la conexion se haya cargado
          const response = JSON.parse(http.response); //convertir la respuesta en json
          if (http.status >= 400) { //si el estado es mayor o igual a 400
            reject(response); //rechazar la promesa
          } else {
            resolve(response); //resolver la promesa
          }
      };
  });
  return promesa; //devolver la promesa
}

listaClientes() //llamar a la funcion listaClientes
  .then(data => { //cuando la promesa se haya resuelto
      data.forEach(perfil => { //recorrer los clientes
          const nuevaFila = crearNuevaFila(perfil.Nombre, perfil.email); //crear una nueva fila con los datos del cliente
          table.appendChild(nuevaFila); //agregar la nueva fila a la tabla
      });
  })
  .catch((error) => alert('Ocurrio un error')); //si hay un error mostrar alerta
