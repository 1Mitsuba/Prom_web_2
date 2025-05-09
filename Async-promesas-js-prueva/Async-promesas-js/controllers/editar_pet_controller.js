import { petService } from "../service/pet-service.js";
import { clientServices } from "../service/client-service.js";

// Obtener elementos del DOM
const formulario = document.getElementById('petForm');
const inputNombre = document.getElementById('nombre');
const inputRaza = document.getElementById('raza');
const inputEdad = document.getElementById('edad');
const selectDueno = document.getElementById('dueno');
const resultElement = document.getElementById('result');

// Variable para almacenar el ID de la mascota que se está editando
let idMascota;

// Función para mostrar mensajes
function mostrarMensaje(mensaje, esError = false) {
    if (!resultElement) return; // Verificar que existe el elemento
    
    resultElement.textContent = mensaje;
    resultElement.className = esError ? 
        'result-message error-message' : 
        'result-message success-message';
    resultElement.style.display = 'block';
    
    if (!esError) {
        setTimeout(() => {
            window.location.href = './lista_pets.html';
        }, 1500);
    }
}

// Cargar clientes en el selector
async function cargarClientes() {
    try {
        console.log("Cargando clientes...");
        const clientes = await clientServices.listaclientes();
        console.log("Clientes recibidos:", clientes);
        
        if (Array.isArray(clientes)) {
            // Limpiar opciones anteriores excepto la primera
            while (selectDueno.options.length > 1) {
                selectDueno.remove(1);
            }
            
            // Agregar clientes al selector
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nombre;
                selectDueno.appendChild(option);
            });
            
            console.log("Clientes cargados en el selector");
        } else {
            console.error("No se recibió un array de clientes:", clientes);
        }
    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}

// Cargar datos de la mascota por ID
async function cargarDatosMascota(id) {
    try {
        console.log(`Cargando datos de mascota con ID: ${id}`);
        const mascota = await petService.detallePet(id);
        console.log("Datos de la mascota recibidos:", mascota);
        
        if (mascota) {
            // Llenar el formulario con los datos
            inputNombre.value = mascota.nombre || '';
            inputRaza.value = mascota.raza || '';
            inputEdad.value = mascota.edad || '';
            
            // Si tiene un dueño asignado, seleccionarlo en la lista
            if (mascota.id) {
                console.log(`Seleccionando dueño con ID: ${mascota.id}`);
                selectDueno.value = mascota.id;
            }
        } else {
            mostrarMensaje("No se encontró la mascota solicitada", true);
        }
    } catch (error) {
        console.error("Error al cargar datos de la mascota:", error);
        mostrarMensaje(`Error: ${error.message}`, true);
    }
}

// Inicializar la página
async function inicializarPagina() {
    try {
        // Obtener ID de mascota de la URL
        const url = new URL(window.location);
        idMascota = url.searchParams.get('id');
        
        if (!idMascota) {
            throw new Error("No se proporcionó ID de mascota en la URL");
        }
        
        console.log(`ID de mascota desde URL: ${idMascota}`);
        
        // Primero cargar clientes para el selector
        await cargarClientes();
        
        // Luego cargar los datos de la mascota
        await cargarDatosMascota(idMascota);
        
    } catch (error) {
        console.error("Error al inicializar página:", error);
        mostrarMensaje(`Error: ${error.message}`, true);
    }
}

// Configurar el envío del formulario
if (formulario) {
    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        console.log("Formulario enviado - Actualizando mascota");
        
        try {
            const nombre = inputNombre.value;
            const raza = inputRaza.value;
            const edadInput = inputEdad.value;
            const cliente_id = selectDueno.value;
            
            // Validación básica
            if (!nombre.trim()) {
                mostrarMensaje("El nombre es obligatorio", true);
                return;
            }
            
            // Convertir edad a número o null
            const edad = edadInput.trim() ? parseInt(edadInput) : null;
            
            console.log("Datos a actualizar:", {
                id_pet: idMascota,
                nombre,
                raza,
                edad,
                cliente_id
            });
            
            // Llamar al servicio para actualizar
            const respuesta = await petService.actualizarPet(
                idMascota,
                nombre,
                raza,
                edad,
                cliente_id
            );
            
            console.log("Respuesta del servidor:", respuesta);
            mostrarMensaje("¡Mascota actualizada con éxito!");
            
        } catch (error) {
            console.error("Error al actualizar mascota:", error);
            mostrarMensaje(`Error: ${error.message}`, true);
        }
    });
}

// Iniciar cuando se cargue la página
document.addEventListener('DOMContentLoaded', inicializarPagina);