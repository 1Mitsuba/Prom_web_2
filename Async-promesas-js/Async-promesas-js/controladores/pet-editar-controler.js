/**
 * Controlador para la página de edición de mascotas
 * Gestiona el proceso de actualizar datos de mascotas existentes
 */

// Importamos el servicio necesario para operaciones con mascotas
import { petService } from "../service/pet-service.js";

// Obtenemos la referencia al formulario de edición
const formulario = document.querySelector('[data-form]');

// Función para obtener y mostrar la información de la mascota a editar
const obtenerInformacion = () => {
    // Obtenemos la URL actual
    const url = new URL(window.location);
    // Extraemos el ID de la mascota de los parámetros de la URL
    const id = url.searchParams.get('id');
    
    // Verificamos si se proporcionó un ID válido
    if (id === null) {
        // Si no hay ID, redirigimos a la lista de mascotas
        window.location.href = '../screens/lista_pets.html';
        return;
    }
    
    // Obtenemos referencias a los campos del formulario
    const nombre = document.querySelector('[data-nombre]');
    const raza = document.querySelector('[data-raza]');
    const edad = document.querySelector('[data-edad]');
    const propietario = document.querySelector('[data-propietario]');
    
    // Cargamos los datos actuales de la mascota
    petService.obtenerPet(id)
        .then(pet => {
            // Rellenamos los campos del formulario con los datos obtenidos
            nombre.value = pet.nombre;
            raza.value = pet.raza;
            edad.value = pet.edad;
            propietario.value = pet.propietario;
        })
        .catch(error => {
            // Manejo de errores al cargar los datos
            console.error("Error al cargar mascota:", error);
            alert("No se pudo cargar la información de la mascota");
            window.location.href = '../screens/lista_pets.html';
        });
    
    // Configuramos el evento para el envío del formulario
    formulario.addEventListener('submit', (evento) => {
        // Prevenimos el comportamiento predeterminado del formulario
        evento.preventDefault();
        
        // Llamamos al servicio para actualizar la mascota
        petService.actualizarPet(
            nombre.value, // Nombre actualizado
            raza.value,   // Raza actualizada
            parseInt(edad.value), // Edad actualizada (convertida a entero)
            propietario.value, // Propietario actualizado
            id           // ID de la mascota que estamos editando
        )
        .then(() => {
            // Redirigimos a la página de edición completada
            window.location.href = '../screens/pet_edicion_concluida.html';
        })
        .catch(error => {
            // Manejo de errores en caso de fallo
            console.error("Error al actualizar:", error);
            alert("No se pudo actualizar la mascota");
        });
    });
};

// Iniciamos la carga de la información cuando cargue la página
obtenerInformacion();