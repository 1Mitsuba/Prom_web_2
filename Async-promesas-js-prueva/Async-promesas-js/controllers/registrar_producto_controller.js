import { productoService } from "../service/producto-service.js";

// Obtener referencia al formulario
const formulario = document.querySelector("[data-form]");

// Función para manejar el envío del formulario
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  
  try {
    // Obtener los valores del formulario
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    
    console.log("Datos del formulario:", { nombre, precio, descripcion });
    
    // Llamar al servicio para crear el producto
    const resultado = await productoService.crearProducto(nombre, parseFloat(precio), descripcion);
    console.log("Resultado:", resultado);
    
    // Redireccionar a la lista de productos después de crear
    window.location.href = "../screens/lista_productos.html";
  } catch (error) {
    console.error("Error al registrar producto:", error);
    alert("Ocurrió un error al registrar el producto: " + error.message);
  }
});