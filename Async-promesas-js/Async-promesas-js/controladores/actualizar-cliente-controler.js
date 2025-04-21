import { clientService } from "../service/client-service.js";

// Selección del formulario
const formulario = document.querySelector("[data-form]");

// Función para obtener el cliente desde la URL y cargar sus datos
const obtenerInformacion = async () => {
    // Obtener el id desde la URL
    const url = new URL(window.location);
    const id = url.searchParams.get('id');
    
    // Si no hay ID, redirigir a la lista de clientes
    if (id === null) {
        window.location.href = "../screens/error.html";
        return;
    }
    
    try {
        // Obtener los datos del cliente
        const perfil = await clientService.clientes(id);
        
        // Si no existe el cliente con ese ID
        if (!perfil) {
            window.location.href = "../screens/error.html";
            return;
        }
        
        // Llenar el formulario con los datos del cliente
        const nombre = document.querySelector('[data-nombre]');
        const email = document.querySelector('[data-email]');
        
        nombre.value = perfil.nombre;
        email.value = perfil.email;
        
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        window.location.href = "../screens/error.html";
    }
};

// Ejecutar la función al cargar la página
obtenerInformacion();

// Manejar el evento submit del formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    const url = new URL(window.location);
    const id = url.searchParams.get('id');
    
    // Obtener los valores actualizados
    const nombre = document.querySelector('[data-nombre]').value;
    const email = document.querySelector('[data-email]').value;
    
    // Actualizar el cliente
    clientService.actualizarClientes(nombre, email, id)
        .then(() => {
            // Redirigir a la página de confirmación
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(error => {
            console.error("Error al actualizar cliente:", error);
            alert("No se pudo actualizar el cliente");
        });
});