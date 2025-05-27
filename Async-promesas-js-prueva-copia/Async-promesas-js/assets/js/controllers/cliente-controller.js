// filepath: d:\Prom_web_2\Prom_web_2\Async-promesas-js-prueva-copia\Async-promesas-js\assets\js\controllers\cliente-controller.js
import { clienteService } from '../services/cliente-service.js';

const crearNuevaLinea = (nombre, email, id) => {
    const linea = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">
                        Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    linea.innerHTML = contenido;
    
    const btn = linea.querySelector('button');
    btn.addEventListener('click', () => {
        const id = btn.id;
        
        clienteService.eliminarCliente(id)
            .then(() => {
                linea.remove();
                mostrarNotificacion('Cliente eliminado con éxito', 'success');
            })
            .catch(error => {
                console.error('Error al eliminar:', error);
                mostrarNotificacion('Error al eliminar el cliente', 'error');
            });
    });
    
    return linea;
};

const table = document.querySelector('[data-table]');
const cargando = document.createElement('div');
cargando.className = 'loading';
cargando.textContent = 'Cargando...';
table.appendChild(cargando);

// Función para mostrar notificaciones
const mostrarNotificacion = (mensaje, tipo) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
};

// Cargar clientes desde la API
clienteService.listaClientes()
    .then(data => {
        table.removeChild(cargando);
        // Verificar si la respuesta es un array o contiene un error
        if (Array.isArray(data)) {
            data.forEach(({nombre, email, id}) => {
                const nuevaLinea = crearNuevaLinea(nombre, email, id);
                table.appendChild(nuevaLinea);
            });
        } else if (data.error) {
            throw new Error(data.error);
        } else {
            throw new Error('Formato de respuesta no válido');
        }
    })
    .catch(error => {
        table.removeChild(cargando);
        console.error('Error:', error);
        const mensajeError = document.createElement('div');
        mensajeError.className = 'error-message';
        mensajeError.textContent = `Error al cargar la lista de clientes: ${error.message}`;
        table.appendChild(mensajeError);
        mostrarNotificacion('Error al cargar los clientes', 'error');
    });