import { petService } from '../../services/pet-service.js';
import { mostrarMensaje } from '../../utils.js';

// Variable para almacenar las mascotas
let mascotas = [];

// Elemento donde se mostrarán las mascotas
const tablaMascotas = document.getElementById('tabla-mascotas');
const resultElement = document.getElementById('result');

/**
 * Carga y muestra la lista de mascotas
 */
async function listarMascotas() {
    try {
        // Mostrar mensaje de carga
        mostrarMensaje("Cargando mascotas...", false);
        
        // Obtener mascotas del servicio
        mascotas = await petService.listarMascotas();
        console.log("Mascotas obtenidas:", mascotas);
        
        // Comprobar si hay mascotas
        if (mascotas && mascotas.length > 0) {
            // Ocultar mensaje
            if (resultElement) resultElement.style.display = 'none';
            
            // Mostrar mascotas
            mostrarMascotas();
        } else {
            // Mostrar mensaje de que no hay mascotas
            mostrarMensaje("No hay mascotas registradas", false);
        }
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al cargar las mascotas: " + error.message, true);
    }
}

/**
 * Muestra las mascotas en la tabla
 */
function mostrarMascotas() {
    if (!tablaMascotas) {
        console.error("No se encontró el elemento tabla-mascotas");
        return;
    }
    
    // Limpiar tabla
    tablaMascotas.innerHTML = '';
    
    // Crear filas para cada mascota
    mascotas.forEach(mascota => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${mascota.nombre || 'Sin nombre'}</td>
            <td>${mascota.cliente ? mascota.cliente.nombre : 'Sin dueño'}</td>
            <td>${mascota.raza || 'No especificada'}</td>
            <td>${mascota.edad ? mascota.edad + ' años' : 'No especificada'}</td>
            <td>
                <div class="table__actions">
                    <a href="./editar_pet.html?id=${mascota.id_pet}" class="action-button action-button--edit">
                        <i class="fas fa-edit"></i> Editar
                    </a>
                    <button class="action-button action-button--delete" 
                            data-id="${mascota.id_pet}" 
                            onclick="confirmarEliminacion('${mascota.id_pet}', '${mascota.nombre}')">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        
        tablaMascotas.appendChild(row);
    });
}

// Función global para confirmar eliminación
window.confirmarEliminacion = function(id, nombre) {
    if (confirm(`¿Está seguro que desea eliminar la mascota "${nombre}"?`)) {
        eliminarMascota(id, nombre);
    }
};

/**
 * Elimina una mascota
 */
async function eliminarMascota(id, nombre) {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Eliminando mascota...", false);
        
        // Eliminar mediante el servicio
        await petService.eliminarMascota(id);
        
        // Actualizar lista y mostrar mensaje
        await listarMascotas();
        mostrarMensaje("Mascota eliminada con éxito");
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al eliminar mascota: " + error.message, true);
    }
}

// Cargar mascotas cuando se carga la página
document.addEventListener('DOMContentLoaded', listarMascotas);