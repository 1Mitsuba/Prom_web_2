/**
 * Controlador para la página de registro de clientes
 * Gestiona el proceso de crear nuevos clientes
 */

// Importamos el servicio necesario para operaciones con clientes
import { clientService } from "../service/client-service.js";

// Obtenemos la referencia al formulario de registro
const formulario = document.querySelector("[data-form]");

// Añadimos un evento al formulario para capturar su envío
formulario.addEventListener("submit", (evento) => {
    // Prevenimos el comportamiento predeterminado del formulario
    evento.preventDefault();
    
    // Obtenemos los valores de los campos del formulario
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    
    // Validamos el campo de correo electrónico
    if (!validarEmail(email)) {
        // Si el email no es válido, mostramos un mensaje y detenemos el proceso
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }
    
    // Llamamos al servicio para crear un nuevo cliente
    clientService.crearCliente(nombre, email)
        .then(() => {
            // Redirigimos a la página de registro completado
            window.location.href = "../screens/registro_completado.html";
        })
        .catch(error => {
            // Manejo detallado de errores
            console.error("Error al registrar cliente:", error);
            alert("No se pudo registrar el cliente. Intente nuevamente.");
        });
});

// Función para validar el formato de correo electrónico
const validarEmail = (email) => {
    // Expresión regular para validar el formato básico de un email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};