/**
 * Controlador para el registro de tareas
 */

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('form-registro-tarea');
  
  // Verificar si hay un proyectoId en la URL
  const params = new URLSearchParams(window.location.search);
  const proyectoIdParam = params.get('proyectoId');
  
  // Cargar proyectos y usuarios para los selectores
  await cargarProyectos();
  await cargarUsuarios();
  
  // Si hay un proyectoId en la URL, pre-seleccionarlo
  if (proyectoIdParam) {
    const proyectoSelect = document.getElementById('proyectoId');
    if (proyectoSelect) {
      proyectoSelect.value = proyectoIdParam;
      // Opcionalmente, deshabilitar el selector
      // proyectoSelect.disabled = true;
    }
  }
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Obtener los valores del formulario
        const nuevaTarea = {
          id: 't' + Date.now(),
          titulo: document.getElementById('titulo').value,
          proyectoId: document.getElementById('proyectoId').value,
          descripcion: document.getElementById('descripcion').value,
          asignadoA: document.getElementById('asignadoA').value,
          prioridad: document.getElementById('prioridad').value,
          estado: document.getElementById('estado').value
        };
        
        console.log('Datos de la tarea a registrar:', nuevaTarea);
        
        // Enviar los datos a la API
        const response = await fetch('http://localhost:3000/tareas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaTarea)
        });
        
        if (!response.ok) {
          throw new Error('Error al registrar tarea');
        }
        
        alert('Tarea registrada correctamente');
        
        // Redireccionar: si vino desde un proyecto, volver al detalle de ese proyecto
        if (proyectoIdParam) {
          window.location.href = `../proyectos/detalle.html?id=${proyectoIdParam}`;
        } else {
          window.location.href = 'lista.html';
        }
        
      } catch (error) {
        console.error('Error al registrar tarea:', error);
        alert('Error al registrar tarea');
      }
    });
  } else {
    console.error('No se encontró el formulario de registro de tareas');
  }
});

// Función para cargar proyectos en el selector
async function cargarProyectos() {
  try {
    const response = await fetch('http://localhost:3000/proyectos');
    const proyectos = await response.json();
    
    const proyectoSelect = document.getElementById('proyectoId');
    if (!proyectoSelect) return;
    
    proyectos.forEach(proyecto => {
      const option = document.createElement('option');
      option.value = proyecto.id;
      option.textContent = proyecto.nombre;
      proyectoSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
  }
}

// Función para cargar usuarios en el selector
async function cargarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    const usuarios = await response.json();
    
    const usuarioSelect = document.getElementById('asignadoA');
    if (!usuarioSelect) return;
    
    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.textContent = `${usuario.nombre} (${usuario.puesto})`;
      usuarioSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}