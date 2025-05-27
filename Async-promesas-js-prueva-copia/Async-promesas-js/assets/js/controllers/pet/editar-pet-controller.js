import { petService } from '../../services/pet-service.js';
import { clienteService } from '../../services/cliente-service.js';
import { mostrarMensaje, obtenerParametroURL, registrarActividad } from '../../utils.js';

// Elementos del formulario
const petForm = document.getElementById('petForm');
const idInput = document.getElementById('id_pet');
const nombreInput = document.getElementById('nombre');
const razaInput = document.getElementById('raza');
const edadInput = document.getElementById('edad');
const duenoSelect = document.getElementById('dueno');
const resultElement = document.getElementById('result');

// Obtener ID de la mascota de la URL
const id = obtenerParametroURL('id');

// Verificar si se proporcionó un ID
if (!id) {
    window.location.href = "./lista_pets.html";
}

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

/**
 * Carga los datos de la mascota
 */
async function cargarMascota() {
    try {
        // Mostrar mensaje de carga
        mostrarMensaje("Cargando mascota...", false);
        
        // Obtener mascota del servicio
        const mascota = await petService.obtenerMascota(id);
        console.log("Mascota cargada:", mascota);
        
        // Llenar el formulario
        idInput.value = mascota.id_pet;
        nombreInput.value = mascota.nombre || '';
        razaInput.value = mascota.raza || '';
        edadInput.value = mascota.edad || '';
        
        // CORRECCIÓN: El campo del dueño es 'id' en la base de datos
        duenoSelect.value = mascota.id || '';
        
        // Ocultar mensaje de carga
        resultElement.style.display = 'none';
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al cargar mascota: " + error.message, true);
    }
}

// Cargar clientes y luego la mascota
document.addEventListener('DOMContentLoaded', async function() {
    await cargarClientes();
    await cargarMascota();
});

// Manejar envío del formulario
petForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Validar el formulario
        if (!nombreInput.value.trim()) {
            throw new Error("El nombre es obligatorio");
        }
        
        if (!duenoSelect.value) {
            throw new Error("Debe seleccionar un dueño");
        }
        
        // Crear objeto mascota con los datos del formulario
        const mascota = {
            nombre: nombreInput.value.trim(),
            raza: razaInput.value.trim(),
            edad: edadInput.value ? parseInt(edadInput.value) : null,
            // CORRECCIÓN: El campo del dueño es 'id' en la base de datos
            id: duenoSelect.value
        };
        
        console.log("Datos a actualizar:", mascota);
        
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Actualizando mascota...", false);
        
        // Actualizar mascota
        await petService.actualizarMascota(id, mascota);
        
        // Registrar actividad
        registrarActividad('editar', 'mascota', mascota.nombre);
        
        // Mostrar mensaje y redireccionar
        mostrarMensaje("Mascota actualizada con éxito", false, true, './lista_pets.html?updated=true');
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al actualizar mascota: " + error.message, true);
    }
});