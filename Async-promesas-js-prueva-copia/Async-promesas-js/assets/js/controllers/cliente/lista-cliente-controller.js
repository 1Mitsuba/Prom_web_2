import { clienteService } from '../../services/cliente-service.js';

const tablaClientes = document.getElementById('tabla-clientes');
const resultArea = document.getElementById('result');

// Función para mostrar mensaje (error o éxito)
const mostrarMensaje = (mensaje, tipo) => {
    if (!resultArea) {
        console.error("Elemento 'result' no encontrado en el DOM");
        return;
    }
    
    resultArea.textContent = mensaje;
    resultArea.className = `alert alert-${tipo}`;
    resultArea.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        resultArea.style.display = 'none';
    }, 5000);
};

// Función para crear una nueva fila de cliente
const crearFilaCliente = (nombre, email, id) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${nombre || 'Sin nombre'}</td>
        <td>${email || 'Sin email'}</td>
        <td class="actions">
            <a href="./editar_cliente.html?id=${id}" class="action-button-edit" title="Editar">
                <i class="fas fa-pen"></i>
            </a>
            <button class="action-button-delete" data-id="${id}" title="Eliminar">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    // Agregar evento de eliminar
    const btnEliminar = fila.querySelector('.action-button-delete');
    btnEliminar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            clienteService.eliminarCliente(id)
                .then(() => {
                    fila.remove();
                    mostrarMensaje('Cliente eliminado con éxito', 'success');
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    mostrarMensaje('No se pudo eliminar el cliente', 'danger');
                });
        }
    });
    
    return fila;
};

// Cargar los clientes al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    if (!tablaClientes) {
        console.error("Tabla de clientes no encontrada en el DOM");
        return;
    }
    
    // Mostrar indicador de carga
    tablaClientes.innerHTML = '<tr><td colspan="3" class="text-center">Cargando clientes...</td></tr>';
    
    console.log("Solicitando lista de clientes...");
    
    // Llamar al servicio para obtener clientes
    clienteService.listaClientes()
        .then(data => {
            console.log("Datos recibidos:", data);
            
            // Limpiar la tabla
            tablaClientes.innerHTML = '';
            
            // Si no hay clientes
            if (!data || data.length === 0) {
                tablaClientes.innerHTML = '<tr><td colspan="3" class="text-center">No hay clientes registrados</td></tr>';
                return;
            }
            
            // Si hay un mensaje de error en la respuesta
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Llenar la tabla con los datos de clientes
            data.forEach(cliente => {
                if (cliente && cliente.id) {
                    const nuevaFila = crearFilaCliente(cliente.nombre, cliente.email, cliente.id);
                    tablaClientes.appendChild(nuevaFila);
                } else {
                    console.warn("Cliente con formato incorrecto:", cliente);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            tablaClientes.innerHTML = `<tr><td colspan="3" class="text-center text-danger">
                Error al cargar la lista de clientes: ${error.message}
            </td></tr>`;
            mostrarMensaje(`Error al cargar la lista de clientes: ${error.message}`, 'danger');
        });
});