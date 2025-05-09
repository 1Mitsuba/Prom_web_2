import { productoService } from "../service/producto-service.js";

// Obtener el ID del producto de la URL
const url = new URL(window.location);
const id = url.searchParams.get("id");

// Referencias a los campos del formulario
const nombreInput = document.querySelector("[data-nombre]");
const precioInput = document.querySelector("[data-precio]");
const descripcionInput = document.querySelector("[data-descripcion]");
const formulario = document.querySelector("[data-form]");

// Función para cargar los datos del producto a editar
const cargarProducto = async () => {
  // Si no hay ID, redirigir a lista de productos
  if (!id) {
    window.location.href = "../screens/lista_productos.html";
    return;
  }

  try {
    // Obtener datos del producto por su ID
    const producto = await productoService.detalleProducto(id);
    
    // Si no se encuentra el producto, redirigir
    if (!producto) {
      window.location.href = "../screens/lista_productos.html";
      return;
    }

    // Cargar los datos en el formulario
    nombreInput.value = producto.nombre;
    precioInput.value = producto.precio;
    descripcionInput.value = producto.descripcion || "";
  } catch (error) {
    console.log("Error al cargar producto:", error);
    alert("Error al cargar los datos del producto");
    window.location.href = "../screens/lista_productos.html";
  }
};

// Cargar datos del producto al iniciar
cargarProducto();

// Manejar envío del formulario
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  
  try {
    // Actualizar el producto con los nuevos datos
    await productoService.actualizarProducto(
      id,
      nombreInput.value, 
      parseFloat(precioInput.value), 
      descripcionInput.value
    );
    
    // Redirigir a la lista de productos
    window.location.href = "../screens/lista_productos.html";
  } catch (error) {
    console.log("Error al actualizar:", error);
    alert("Error al actualizar el producto");
  }
});