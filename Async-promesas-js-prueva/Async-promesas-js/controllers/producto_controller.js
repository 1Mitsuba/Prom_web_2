import { productoService } from "../service/producto-service.js";

// Función para crear una nueva línea en la tabla de productos
const crearNuevaLinea = (nombre, precio, descripcion, id) => {
  // Crear fila de tabla
  const linea = document.createElement("tr");
  
  // Contenido de la fila
  const contenido = `
    <td class="td" data-td>${nombre}</td>
    <td>${precio}</td>
    <td>${descripcion || ""}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_producto.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id}">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;
  
  linea.innerHTML = contenido;
  
  // Agregar evento al botón de eliminar
  const btn = linea.querySelector("button");
  btn.addEventListener("click", () => {
    // Obtener el id del botón
    const id = btn.id;
    
    // Mostrar modal de confirmación
    const modal = document.querySelector(".modal-container");
    modal.classList.remove("modal--close");
    
    // Agregar evento al botón de confirmar eliminación
    const btnConfirm = document.querySelector(".modal__button--confirm");
    btnConfirm.addEventListener("click", async () => {
      try {
        // Eliminar producto
        await productoService.eliminarProducto(id);
        modal.classList.add("modal--close");
        linea.remove();
      } catch (error) {
        console.log(error);
        alert("Error al eliminar producto");
      }
    });
    
    // Manejar botón cancelar
    const btnCancel = document.querySelector(".modal__button:not(.modal__button--confirm)");
    btnCancel.addEventListener("click", () => {
      modal.classList.add("modal--close");
    });
    
    // Manejar botón cerrar (X)
    const btnClose = document.querySelector(".modal__close");
    btnClose.addEventListener("click", () => {
      modal.classList.add("modal--close");
    });
  });
  
  return linea;
};

// Obtener referencia a la tabla
const table = document.querySelector("[data-table]");

// Cargar productos al iniciar
const cargarProductos = async () => {
  try {
    const data = await productoService.listaProductos();
    
    // Crear fila para cada producto
    data.forEach(({ nombre, precio, descripcion, id }) => {
      const nuevaLinea = crearNuevaLinea(nombre, precio, descripcion, id);
      table.appendChild(nuevaLinea);
    });
  } catch (error) {
    console.log(error);
    alert("Error al cargar los productos");
  }
};

cargarProductos();