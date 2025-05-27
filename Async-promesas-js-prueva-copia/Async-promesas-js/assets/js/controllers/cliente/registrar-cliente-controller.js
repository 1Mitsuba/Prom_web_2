import { clienteService } from '../../services/cliente-service.js';
import { mostrarMensaje, registrarActividad } from '../../utils.js';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Capturar elementos del DOM
    const clienteForm = document.getElementById('clienteForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('emal');
    
    // Verificar que los elementos existen
    if (!clienteForm) {
        console.error("Error: No se encontró el formulario con id 'clienteForm'");
        return;
    }
    
    if (!nombreInput) {
        console.error("Error: No se encontró el campo con id 'nombre'");
        return;
    }
    
    if (!emailInput) {
        console.error("Error: No se encontró el campo con id 'emal'");
        return;
    }
    
    // Función para manejar el registro
    async function registrarCliente(event) {
        event.preventDefault();
        
        try {
            // Obtener valores de los campos
            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            
            // Validar datos
            if (!nombre) {
                throw new Error("El nombre es obligatorio");
            }
            
            // Crear objeto cliente
            const cliente = {
                nombre: nombre,
                emal: email
            };
            
            console.log("Datos a registrar:", cliente);
            
            // Mostrar mensaje de procesamiento
            mostrarMensaje("Registrando cliente...", false);
            
            // Registrar cliente
            const nuevoCliente = await clienteService.crearCliente(cliente);
            
            // Registrar actividad
            registrarActividad('crear', 'cliente', cliente.nombre);
            
            // Mensaje y redirección
            mostrarMensaje("Cliente registrado con éxito", false, true, './lista_cliente.html?created=true');
        } catch (error) {
            console.error("Error:", error);
            mostrarMensaje("Error al registrar cliente: " + error.message, true);
        }
    }
    
    // Agregar event listener al formulario
    clienteForm.addEventListener('submit', registrarCliente);
});