import { petService } from '../../services/pet-service.js';
import { clienteService } from '../../services/cliente-service.js';
import { mostrarMensaje, registrarActividad } from '../../utils.js';

// Elementos del formulario
const petForm = document.getElementById('petForm');
const duenoSelect = document.getElementById('dueno');

/**
 * Carga la lista de clientes para el dropdown
 */
async function cargarClientes() {
    try {
        // Obtener clientes
        const clientes = await clienteService.listarClientes();
        
        // Ordenar por nombre
        clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
        
        // Agregar opciones al select
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nombre;
            duenoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al cargar la lista de dueños", true);
    }
}

// Cargar clientes cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarClientes);

// Manejar envío del formulario
petForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const raza = document.getElementById('raza').value.trim();
        const edad = document.getElementById('edad').value;
        const dueno = duenoSelect.value;
        
        // Validaciones
        if (!nombre) {
            throw new Error("El nombre de la mascota es obligatorio");
        }
        
        if (!dueno) {
            throw new Error("Debe seleccionar un dueño");
        }
        
        // Crear objeto mascota
        const mascota = {
            nombre,
            raza,
            edad: edad ? parseInt(edad) : null,
            // Usamos 'id' que es el nombre real de la columna en la DB
            id: dueno
        };
        
        console.log("Datos a registrar:", mascota);
        
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Registrando mascota...", false);
        
        // Registrar mascota
        const nuevaMascota = await petService.crearMascota(mascota);
        
        // Registrar actividad
        registrarActividad('crear', 'mascota', mascota.nombre);
        
        // Mensaje y redirección
        mostrarMensaje("Mascota registrada con éxito", false, true, './lista_pets.html?created=true');
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al registrar mascota: " + error.message, true);
    }
});