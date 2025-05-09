import { petService } from "../service/pet-service.js";
import { clientServices } from "../service/client-service.js";

// Verificar que se hayan importado correctamente los servicios
console.log("Servicios importados:", { petService, clientServices });

// Referencias al DOM
const formulario = document.querySelector("[data-form]");
const clienteSelect = document.querySelector("[data-cliente]");

// Cargar clientes cuando el documento esté listo
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado - Cargando clientes");
  try {
    console.log("Obteniendo lista de clientes...");
    const clientes = await clientServices.listaclientes();
    console.log("Clientes recibidos:", clientes);
    
    // Llenar el selector
    if (Array.isArray(clientes) && clientes.length > 0) {
      clientes.forEach((cliente) => {
        console.log("Agregando cliente al selector:", cliente);
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.nombre;
        clienteSelect.appendChild(option);
      });
      console.log("Clientes cargados en el selector");
    } else {
      console.error("No se recibieron datos de clientes válidos:", clientes);
    }
  } catch (error) {
    console.error("Error al cargar clientes:", error);
  }
});

// Manejar envío del formulario
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  console.log("Formulario enviado");
  
  try {
    // Obtener valores del formulario
    const nombre = document.querySelector("[data-nombre]").value;
    const raza = document.querySelector("[data-raza]").value;
    const edadInput = document.querySelector("[data-edad]").value;
    const cliente_id = clienteSelect.value;
    
    console.log("Datos del formulario:", { nombre, raza, edadInput, cliente_id });
    
    // Validación básica
    if (!nombre.trim()) {
      alert("El nombre de la mascota es obligatorio");
      return;
    }
    
    // Convertir edad a número o null
    const edad = edadInput.trim() ? parseInt(edadInput) : null;
    
    // Crear mascota
    console.log("Llamando a petService.crearPet con:", { nombre, raza, edad, cliente_id });
    const respuesta = await petService.crearPet(nombre, raza, edad, cliente_id);
    console.log("Respuesta del servidor:", respuesta);
    
    // Redireccionar
    alert("Mascota registrada con éxito");
    window.location.href = "../screens/lista_pets.html";
  } catch (error) {
    console.error("Error al registrar mascota:", error);
    alert("Error al registrar mascota: " + error.message);
  }
});