import { clienteService } from '../../services/cliente-service.js';
import { mostrarMensaje, obtenerParametroURL, registrarActividad } from '../../utils.js';

// Variable para almacenar los clientes
let clientes = [];

// Elemento donde se mostrarán los clientes
const tablaClientes = document.getElementById('tabla-clientes');
const resultElement = document.getElementById('result');

/**
 * Carga y muestra la lista de clientes
 */
async function listarClientes() {
    try {
        // Mostrar mensaje de carga
        if (resultElement) {
            mostrarMensaje("Cargando clientes...", false);
        }
        
        // Obtener clientes del servicio
        clientes = await clienteService.listarClientes();
        
        // Verificar si hay mensaje de creación/actualización
        const created = obtenerParametroURL('created');
        const updated = obtenerParametroURL('updated');
        
        if (created) {
            mostrarMensaje("¡Cliente registrado con éxito!");
        } else if (updated) {
            mostrarMensaje("¡Cliente actualizado con éxito!");
        } else if (resultElement) {
            resultElement.style.display = 'none';
        }
        
        // Mostrar clientes en la tabla
        mostrarClientes();
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al cargar la lista de clientes: " + error.message, true);
    }
}

/**
 * Muestra los clientes en la tabla
 */
function mostrarClientes() {
    if (!tablaClientes) return;
    
    // Limpiar tabla
    tablaClientes.innerHTML = '';
    
    // Crear filas para cada cliente
    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.emal || ''}</td>
            <td>
                <div class="table__actions">
                    <a href="./editar_cliente.html?id=${cliente.id}" class="action-button action-button--edit">
                        <i class="fas fa-edit"></i> Editar
                    </a>
                    <button class="action-button action-button--delete" 
                            data-id="${cliente.id}" 
                            onclick="confirmarEliminacion('${cliente.id}', '${cliente.nombre}')">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        
        tablaClientes.appendChild(row);
    });
}

// Función global para confirmar eliminación
window.confirmarEliminacion = function(id, nombre) {
    if (confirm(`¿Está seguro que desea eliminar al cliente "${nombre}"?`)) {
        eliminarCliente(id, nombre);
    }
};

/**
 * Elimina un cliente
 */
async function eliminarCliente(id, nombre) {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensaje("Eliminando cliente...", false);
        
        // Eliminar mediante el servicio
        await clienteService.eliminarCliente(id);
        
        // Registrar actividad
        registrarActividad('eliminar', 'cliente', nombre);
        
        // Actualizar lista y mostrar mensaje
        await listarClientes();
        mostrarMensaje("Cliente eliminado con éxito");
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error al eliminar cliente: " + error.message, true);
    }
}

// Cargar clientes cuando se carga la página
document.addEventListener('DOMContentLoaded', listarClientes);

// Asegurarse de que los encabezados de tabla usen el formato correcto

// Buscar el HTML de la tabla y asegurarse de que los encabezados tengan este formato:
// <thead>
//   <tr>
//     <th>NOMBRE</th>
//     <th>EMAIL</th>
//     <th>ACCIONES</th>
//   </tr>
// </thead>