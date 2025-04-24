/**
 * Controlador para la edición de proyectos
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Obtener el ID del proyecto de la URL
  const params = new URLSearchParams(window.location.search);
  const proyectoId = params.get('id');
  
  if (!proyectoId) {
    alert('ID de proyecto no especificado');
    window.location.href = 'lista.html';
    return;
  }
  
  const form = document.getElementById('form-edicion-proyecto');
  
  if (!form) {
    console.error('No se encontró el formulario de edición');
    return;
  }
  
  try {
    // Cargar los equipos para el selector
    await cargarEquipos();
    
    // Cargar los datos actuales del proyecto
    const response = await fetch(`http://localhost:3000/proyectos/${proyectoId}`);
    
    if (!response.ok) {
      throw new Error('Error al cargar los datos del proyecto');
    }
    
    const proyecto = await response.json();
    
    // Rellenar el formulario con los datos
    document.getElementById('nombre').value = proyecto.nombre;
    document.getElementById('descripcion').value = proyecto.descripcion;
    document.getElementById('equipoId').value = proyecto.equipoId;
    document.getElementById('fechaInicio').value = proyecto.fechaInicio;
    document.getElementById('fechaLimite').value = proyecto.fechaLimite;
    document.getElementById('estado').value = proyecto.estado;
    
    // Escuchar el evento submit del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Recoger los datos actualizados
        const proyectoActualizado = {
          id: proyectoId,
          nombre: document.getElementById('nombre').value,
          descripcion: document.getElementById('descripcion').value,
          equipoId: document.getElementById('equipoId').value,
          fechaInicio: document.getElementById('fechaInicio').value,
          fechaLimite: document.getElementById('fechaLimite').value,
          estado: document.getElementById('estado').value
        };
        
        // Validar fechas
        if (new Date(proyectoActualizado.fechaLimite) < new Date(proyectoActualizado.fechaInicio)) {
          alert('La fecha límite no puede ser anterior a la fecha de inicio');
          return;
        }
        
        // Enviar la petición PUT para actualizar el proyecto
        const updateResponse = await fetch(`http://localhost:3000/proyectos/${proyectoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(proyectoActualizado)
        });
        
        if (!updateResponse.ok) {
          throw new Error('Error al actualizar el proyecto');
        }
        
        alert('Proyecto actualizado correctamente');
        window.location.href = 'lista.html';
      } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        alert('Error al actualizar el proyecto');
      }
    });
    
  } catch (error) {
    console.error('Error al cargar proyecto:', error);
    alert('Error al cargar los datos del proyecto');
    window.location.href = 'lista.html';
  }
});

// Función para cargar equipos en el selector
async function cargarEquipos() {
  try {
    const response = await fetch('http://localhost:3000/equipos');
    const equipos = await response.json();
    
    const equipoSelect = document.getElementById('equipoId');
    if (!equipoSelect) return;
    
    equipos.forEach(equipo => {
      const option = document.createElement('option');
      option.value = equipo.id;
      option.textContent = equipo.nombre;
      equipoSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar equipos:', error);
  }
}