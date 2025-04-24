/**
 * Controlador para la edición de tareas
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Obtener el ID de la tarea de la URL
  const params = new URLSearchParams(window.location.search);
  const tareaId = params.get('id');
  
  if (!tareaId) {
    alert('ID de tarea no especificado');
    window.location.href = 'lista.html';
    return;
  }
  
  const form = document.getElementById('form-edicion-tarea');
  
  if (!form) {
    console.error('No se encontró el formulario de edición');
    return;
  }
  
  try {
    // Cargar los proyectos y usuarios para los selectores
    await cargarProyectos();
    await cargarUsuarios();
    
    // Cargar los datos actuales de la tarea
    const response = await fetch(`http://localhost:3000/tareas/${tareaId}`);
    
    if (!response.ok) {
      throw new Error('Error al cargar los datos de la tarea');
    }
    
    const tarea = await response.json();
    
    // Rellenar el formulario con los datos
    document.getElementById('titulo').value = tarea.titulo;
    document.getElementById('proyectoId').value = tarea.proyectoId;
    document.getElementById('descripcion').value = tarea.descripcion;
    document.getElementById('asignadoA').value = tarea.asignadoA || '';
    document.getElementById('prioridad').value = tarea.prioridad;
    document.getElementById('estado').value = tarea.estado;
    
    // Escuchar el evento submit del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Recoger los datos actualizados
        const tareaActualizada = {
          id: tareaId,
          titulo: document.getElementById('titulo').value,
          proyectoId: document.getElementById('proyectoId').value,
          descripcion: document.getElementById('descripcion').value,
          asignadoA: document.getElementById('asignadoA').value || null,
          prioridad: document.getElementById('prioridad').value,
          estado: document.getElementById('estado').value
        };
        
        // Enviar la petición PUT para actualizar la tarea
        const updateResponse = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tareaActualizada)
        });
        
        if (!updateResponse.ok) {
          throw new Error('Error al actualizar la tarea');
        }
        
        alert('Tarea actualizada correctamente');
        window.location.href = 'lista.html';
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
        alert('Error al actualizar la tarea');
      }
    });
    
  } catch (error) {
    console.error('Error al cargar tarea:', error);
    alert('Error al cargar los datos de la tarea');
    window.location.href = 'lista.html';
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