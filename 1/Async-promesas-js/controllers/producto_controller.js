import { productoService } from "../service/producto-service.js";

// Función para crear una nueva línea en la tabla de productos
const crearNuevaLinea = (nombre, precio, descripcion, id) => {
  // Crear fila de tabla
  const linea = document.createElement("tr");
  
  // Contenido de la fila
  const contenido = `
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${descripcion || ""}</td>
    <td class="text-right">
      <div class="table-actions">
        <a href="../screens/editar_producto.html?id=${id}" class="action-button edit">
          <span>✏️</span>
        </a>
        <button class="action-button delete" type="button" id="${id}">
          <span>🗑️</span>
        </button>
      </div>
    </td>
  `;
  
  linea.innerHTML = contenido;
  
  // Agregar evento al botón de eliminar
  const btn = linea.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    const modal = document.querySelector(".modal-container");
    modal.classList.remove("modal--close");
    
    // Almacena la fila para usarla en el evento de confirmación
    modal.dataset.targetRow = id;
  });
  
  return linea;
};

// Configurar los botones del modal una sola vez fuera del evento click
const setupModalButtons = () => {
  const modal = document.querySelector(".modal-container");
  const btnConfirm = document.querySelector(".modal__button--confirm");
  const btnCancel = document.querySelector(".button--secondary");
  const btnClose = document.querySelector(".modal__close");
  
  btnConfirm.addEventListener("click", async () => {
    const id = modal.dataset.targetRow;
    if (id) {
      try {
        await productoService.eliminarProducto(id);
        modal.classList.add("modal--close");
        // Buscar y eliminar la fila correspondiente
        const fila = document.querySelector(`button[id="${id}"]`).closest("tr");
        if (fila) fila.remove();
        // Redirigir con parámetro para mostrar mensaje
        window.location.href = "./lista_productos.html?deleted=true";
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  });
  
  btnCancel.addEventListener("click", () => {
    modal.classList.add("modal--close");
  });
  
  btnClose.addEventListener("click", () => {
    modal.classList.add("modal--close");
  });
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

// Llamar a setupModalButtons después de cargar productos
cargarProductos().then(setupModalButtons);