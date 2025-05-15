import {clientService} from "../service/client-service.js"
const crear_nueva_fila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td class="text-right">
            <div class="table-actions">
                <a href="../screens/editar_cliente.html?id=${id}" class="action-button edit">
                    <span>✏️</span>
                </a>
                <button class="action-button delete" type="button" id="${id}">
                    <span>🗑️</span>
                </button>
            </div>
        </td>
    `;
    fila.innerHTML = contenido;
    
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        const modal = document.querySelector(".modal-container");
        modal.classList.remove("modal--close");
        
        // Almacena el ID y la fila para usarlos en el evento de confirmación
        modal.dataset.targetId = id;
        modal.dataset.targetRow = fila;
    });
    
    return fila;
};

// Configurar los botones del modal una sola vez
const setupModalButtons = () => {
    const modal = document.querySelector(".modal-container");
    const btnConfirm = document.querySelector(".modal__button--confirm");
    const btnCancel = document.querySelector(".button--secondary");
    const btnClose = document.querySelector(".modal__close");
    
    btnConfirm.addEventListener("click", async () => {
        const id = modal.dataset.targetId;
        if (id) {
            try {
                await clientService.eliminarCliente(id);
                modal.classList.add("modal--close");
                
                // Eliminar la fila correspondiente
                const fila = document.querySelector(`button[id="${id}"]`).closest("tr");
                if (fila) fila.remove();
                
                // Redirigir con parámetro para mostrar mensaje
                window.location.href = "./lista_cliente.html?deleted=true";
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
                alert("Error al eliminar el cliente");
            }
        }
    });
    
    btnCancel.addEventListener("click", () => {
        modal.classList.add("modal--close");
    });
    
    btnClose.addEventListener("click", () => {
        modal.classList.add("modal--close");
    });
};

// Obtener referencia a la tabla
const table = document.querySelector("[data-table]");

// Cargar clientes al iniciar
const cargarClientes = async () => {
    try {
        const data = await clientService.listaclientes();
        
        // Borrar el contenido de "cargando..." de la tabla
        table.innerHTML = '';
        
        // Crear fila para cada cliente
        data.forEach(({ nombre, email, id }) => {
            const nuevaLinea = crear_nueva_fila(nombre, email, id);
            table.appendChild(nuevaLinea);
        });
        
        return data;
    } catch (error) {
        console.error("Error al cargar clientes:", error);
        alert("Ocurrió un error al cargar los clientes");
    }
};

// Iniciar la carga y configurar botones del modal
cargarClientes().then(setupModalButtons);