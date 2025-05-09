import { petService } from "../service/pet-service.js";

const crearNuevaLinea = (id_pet, nombre, raza, edad, dueno_nombre = "Sin dueño") => {
  const linea = document.createElement("tr");
  
  // Construir el contenido de la línea con el formato correcto
  const contenido = `
    <td class="td" data-td>${nombre}</td>
    <td>${raza || "No especificado"}</td>
    <td>${edad || "No especificado"}</td>
    <td>${dueno_nombre}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="./editar_pet.html?id=${id_pet}" class="simple-button simple-button--edit">Editar</a>
        </li>
        <li>
          <button 
            class="simple-button simple-button--delete" 
            type="button" 
            id="${id_pet}"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;
  
  linea.innerHTML = contenido;
  
  // Agregar funcionalidad al botón de eliminar
  const btn = linea.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    petService
      .eliminarPet(id)
      .then(() => {
        linea.remove();
      })
      .catch((err) => alert("Ocurrió un error al eliminar la mascota"));
  });
  
  return linea;
};

const table = document.querySelector("[data-table]");

// Cargar las mascotas al inicio
window.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Cargando mascotas...");
    const mascotas = await petService.listaPets();
    console.log("Mascotas recibidas:", mascotas);
    
    if (Array.isArray(mascotas)) {
      // Limpiar tabla primero
      table.innerHTML = '';
      
      // Cargar cada mascota en la tabla
      mascotas.forEach((pet) => {
        const nuevaLinea = crearNuevaLinea(
          pet.id_pet,
          pet.nombre,
          pet.raza,
          pet.edad,
          pet.dueno_nombre || "Sin dueño" // Usar el nombre del dueño si existe
        );
        table.appendChild(nuevaLinea);
      });
    } else {
      console.error("No se recibió un array de mascotas:", mascotas);
    }
  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    alert("Error al cargar la lista de mascotas");
  }
});