/**
 * Controlador para la página de edición de clientes
 * Gestiona el proceso de actualizar datos de clientes existentes
 */

// Importamos el servicio necesario para operaciones con clientes
import { clientService } from "../service/client-service.js";

// Obtenemos la referencia al formulario de edición
const formulario = document.querySelector("[data-form]");

// Función para obtener y mostrar la información del cliente a editar
const obtenerInformacion = async () => {
    // Obtenemos la URL actual
    const url = new URL(window.location);
    // Extraemos el ID del cliente de los parámetros de la URL
    const id = url.searchParams.get("id");
    
    // Verificamos si se proporcionó un ID válido
    if (id === null) {
        // Si no hay ID, redirigimos a la página de error
        window.location.href = "../screens/error.html";
        return;
    }

    // Obtenemos referencias a los campos del formulario
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    
    try {
        // Cargamos los datos actuales del cliente
        const perfil = await clientService.clientes(id);
        
        // Verificamos si se encontró el cliente
        if (perfil) {
            // Rellenamos los campos del formulario con los datos obtenidos
            nombre.value = perfil.nombre;
            email.value = perfil.email;
        } else {
            // Si no se encontró el cliente, redirigimos a la página de error
            throw new Error("No se encontró el cliente");
        }
    } catch (error) {
        // Manejo de errores al cargar los datos
        console.error("Error al cargar los datos:", error);
        window.location.href = "../screens/error.html";
    }
};

// Ejecutamos la función para cargar los datos del cliente
obtenerInformacion();

// Configuramos el evento para el envío del formulario
formulario.addEventListener("submit", (evento) => {
    // Prevenimos el comportamiento predeterminado del formulario
    evento.preventDefault();
    
    // Obtenemos la URL actual
    const url = new URL(window.location);
    // Extraemos el ID del cliente de los parámetros de la URL
    const id = url.searchParams.get("id");
    
    // Obtenemos los valores actualizados de los campos
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    
    // Validamos el campo de correo electrónico
    if (!validarEmail(email)) {
        // Si el email no es válido, mostramos un mensaje y detenemos el proceso
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }
    
    // Llamamos al servicio para actualizar el cliente
    clientService.actualizarClientes(nombre, email, id)
        .then(() => {
            // Redirigimos a la página de actualización completada
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(error => {
            // Manejo detallado de errores
            console.error("Error al actualizar cliente:", error);
            alert("No se pudo actualizar el cliente. Intente nuevamente.");
        });
});

// Función para validar el formato de correo electrónico
const validarEmail = (email) => {
    // Expresión regular para validar el formato básico de un email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};