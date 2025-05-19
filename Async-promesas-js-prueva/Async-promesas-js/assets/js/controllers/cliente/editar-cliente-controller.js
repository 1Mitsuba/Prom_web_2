import { clienteService } from '../../services/cliente-service.js';
import { mostrarMensaje, obtenerParametroURL, registrarActividad } from '../../utils.js';

// Obtener ID del cliente de la URL
const id = obtenerParametroURL('id');

// Verificar si se proporcionó un ID
if (!id) {
    window.location.href = "./lista_cliente.html";
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Capturar elementos del DOM
    const clienteForm = document.getElementById('clienteForm');
    const idInput = document.getElementById('id');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('emal');
    const resultElement = document.getElementById('result');
    
    // Verificar que los elementos existen
    if (!clienteForm) {
        console.error("Error: No se encontró el formulario con id 'clienteForm'");
        return;
    }
    
    if (!idInput) {
        console.error("Error: No se encontró el campo con id 'id'");
        // Continuar aunque no exista idInput, puede que sea un campo oculto que no es crucial para el UI
    }
    
    if (!nombreInput) {
        console.error("Error: No se encontró el campo con id 'nombre'");
        return;
    }
    
    if (!emailInput) {
        console.error("Error: No se encontró el campo con id 'emal'");
        return;
    }
    
    // Función para cargar los datos del cliente
    async function cargarCliente() {
        try {
            // Mostrar mensaje de carga
            mostrarMensaje("Cargando cliente...", false);
            
            // Obtener cliente del servicio
            const cliente = await clienteService.obtenerCliente(id);
            console.log("Cliente cargado:", cliente);
            
            // Llenar el formulario
            if (idInput) idInput.value = cliente.id || '';
            nombreInput.value = cliente.nombre || '';
            emailInput.value = cliente.emal || '';
            
            // Ocultar mensaje de carga
            if (resultElement) {
                resultElement.style.display = 'none';
            }
        } catch (error) {
            console.error("Error:", error);
            mostrarMensaje("Error al cargar cliente: " + error.message, true);
        }
    }
    
    // Función para manejar la actualización del cliente
    async function actualizarCliente(event) {
        event.preventDefault();
        
        try {
            // Validar el formulario
            if (!nombreInput.value.trim()) {
                throw new Error("El nombre es obligatorio");
            }
            
            // Crear objeto cliente con los datos del formulario
            const cliente = {
                nombre: nombreInput.value.trim(),
                emal: emailInput.value.trim()
            };
            
            console.log("Datos a actualizar:", cliente);
            
            // Mostrar mensaje de procesamiento
            mostrarMensaje("Actualizando cliente...", false);
            
            // Actualizar cliente
            await clienteService.actualizarCliente(id, cliente);
            
            // Registrar actividad
            registrarActividad('editar', 'cliente', cliente.nombre);
            
            // Mostrar mensaje y redireccionar
            mostrarMensaje("Cliente actualizado con éxito", false, true, './lista_cliente.html?updated=true');
        } catch (error) {
            console.error("Error:", error);
            mostrarMensaje("Error al actualizar cliente: " + error.message, true);
        }
    }
    
    // Agregar event listener al formulario
    clienteForm.addEventListener('submit', actualizarCliente);
    
    // Cargar cliente
    cargarCliente();
});