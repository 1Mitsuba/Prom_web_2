/**
 * Controlador para el registro de proyectos
 */

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('form-registro-proyecto');
  
  // Cargar equipos para el selector
  await cargarEquipos();
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Obtener los valores del formulario
        const nuevoProyecto = {
          id: 'p' + Date.now(),
          nombre: document.getElementById('nombre').value,
          descripcion: document.getElementById('descripcion').value,
          equipoId: document.getElementById('equipoId').value,
          fechaInicio: document.getElementById('fechaInicio').value,
          fechaLimite: document.getElementById('fechaLimite').value,
          estado: document.getElementById('estado').value
        };
        
        console.log('Datos del proyecto a registrar:', nuevoProyecto);
        
        // Validar fechas
        if (new Date(nuevoProyecto.fechaLimite) < new Date(nuevoProyecto.fechaInicio)) {
          alert('La fecha límite no puede ser anterior a la fecha de inicio');
          return;
        }
        
        // Enviar los datos a la API
        const response = await fetch('http://localhost:3000/proyectos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoProyecto)
        });
        
        if (!response.ok) {
          throw new Error('Error al registrar proyecto');
        }
        
        alert('Proyecto registrado correctamente');
        
        // Redireccionar a la lista de proyectos
        window.location.href = 'lista.html';
        
      } catch (error) {
        console.error('Error al registrar proyecto:', error);
        alert('Error al registrar proyecto');
      }
    });
  } else {
    console.error('No se encontró el formulario de registro de proyectos');
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