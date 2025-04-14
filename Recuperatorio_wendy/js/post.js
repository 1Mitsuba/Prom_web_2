const postData = () => { // Función para crear la base de datos
    // Capturar los valores del formulario
    const task = document.querySelector('#task').value;
    const fecha = document.querySelector('#fecha').value;
    const priori = document.querySelector('#priori').value;
    const valor = parseInt(document.querySelector('#valor').value);
    
    // Validar que todos los campos estén completos
    if (!task || !fecha || !priori || isNaN(valor)) {
        showResult('Por favor complete todos los campos correctamente', true);
        return;
    }
    
    // Crear objeto con los datos del formulario
    const newPost = {
        task: task,
        priori: priori,
        fecha: fecha,
        valor: valor
    };
    
    // API_URL definida globalmente o hacerla explícita
    const API_URL = 'http://localhost:3000/tasks';
    
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(newPost),
    })
    .then(data => {
        // Mostrar mensaje en el elemento de error pero como confirmación
        const errorElement = document.querySelector('#form-error');
        if (errorElement) {
            errorElement.textContent = 'Tarea agregada correctamente';
            errorElement.style.color = 'green'; // Cambiar color para indicar éxito
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                errorElement.textContent = '';
                errorElement.style.color = 'red'; // Restaurar color original
            }, 3000);
        }
        
        // Limpiar formulario
        document.querySelector('#task').value = '';
        document.querySelector('#fecha').value = '';
        document.querySelector('#priori').value = '';
        document.querySelector('#valor').value = '';
        
        // Cargar tareas para actualizar la lista
        getData();
    })
    .catch(error => showResult(error.message, true));
};