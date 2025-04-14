// Función para buscar tareas
const searchTasks = () => {
    const searchValor = document.querySelector('#search-valor').value;
    
    if (!searchValor) {
        showResult('Por favor ingrese un valor para buscar', true);
        return;
    }
    
    fetch(`${API_URL}?valor=${searchValor}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la búsqueda: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateTaskList(data);
            showResult(`Se encontraron ${data.length} tareas`);
        })
        .catch(error => showResult(error.message, true));
};

console.log("searchTasks.js cargado");

// Función para formatear fechas
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
};

// Función para actualizar la lista de tareas con mejor diseño
const updateTaskList = (tasks) => {
    console.log("updateTaskList llamada con:", tasks);
    const taskList = document.querySelector('#task-list');
    
    if (!taskList) {
        console.error("No se encontró el elemento task-list");
        return;
    }
    
    // Mantener solo el título h2
    let h2Element = taskList.querySelector('h2');
    taskList.innerHTML = '';
    taskList.appendChild(h2Element);
    
    // Mensaje si no hay tareas
    if (tasks.length === 0) {
        const noTasks = document.createElement('div');
        noTasks.className = 'no-tasks';
        noTasks.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p>No hay tareas que mostrar</p>
        `;
        taskList.appendChild(noTasks);
        return;
    }
    
    // Crear contenedor de tarjetas con grid
    const taskGrid = document.createElement('div');
    taskGrid.className = 'task-grid';
    taskList.appendChild(taskGrid);
    
    // Agregar cada tarea como una tarjeta moderna
    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card priority-${task.priori.toLowerCase()}`;
        
        // Determinar la clase de icono según prioridad
        let priorityIcon = '';
        if (task.priori.toLowerCase() === 'alta') {
            priorityIcon = `<svg class="priority-icon" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47"/>
            </svg>`;
        } else if (task.priori.toLowerCase() === 'media') {
            priorityIcon = `<svg class="priority-icon" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M7,13H17V11H7"/>
            </svg>`;
        } else {
            priorityIcon = `<svg class="priority-icon" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M7,13H17V11H7"/>
            </svg>`;
        }
        
        // Crear el contenido de la tarjeta
        taskCard.innerHTML = `
            <div class="task-header">
                <h3>${task.task}</h3>
                <span class="task-priority ${task.priori.toLowerCase()}">
                    ${priorityIcon} ${task.priori}
                </span>
            </div>
            <div class="task-body">
                <p class="task-date">
                    <svg class="task-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z"/>
                    </svg>
                    ${formatDate(task.fecha)}
                </p>
                <p class="task-value">
                    <svg class="task-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z"/>
                    </svg>
                    Valor: ${task.valor}
                </p>
            </div>
            <div class="task-actions">
                <button class="edit-btn" data-id="${task.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                    </svg>
                    Editar
                </button>
                <button class="delete-btn" data-id="${task.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
                    Eliminar
                </button>
            </div>
        `;
        taskGrid.appendChild(taskCard);
        
        // Agregar evento al botón de editar
        const editBtn = taskCard.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            // Solicitar nuevos valores mediante prompts
            const newTask = prompt('Nombre de la tarea:', task.task);
            const newPriori = prompt('Prioridad (Alta, Media, Baja):', task.priori);
            const newFecha = prompt('Fecha (YYYY-MM-DD):', task.fecha.split('T')[0]);
            const newValor = prompt('Valor (número entero):', task.valor);
            
            // Solo actualizar si el usuario no canceló
            if (newTask !== null) {
                const updatedTask = {
                    task: newTask,
                    priori: newPriori,
                    fecha: newFecha,
                    valor: parseInt(newValor) || 0
                };
                
                // Usar PUT para actualizar
                fetch(`${API_URL}/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(updatedTask),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la actualización: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    getData();
                })
                .catch(error => {
                    alert(`Error: ${error.message}`);
                });
            }
        });
        
        // Agregar evento al botón de eliminar
        const deleteBtn = taskCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de eliminar la tarea "${task.task}"?`)) {
                fetch(`${API_URL}/${task.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al eliminar: ${response.status}`);
                    }
                    getData();
                })
                .catch(error => alert(`Error: ${error.message}`));
            }
        });
    });
};