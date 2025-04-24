/**
 * Controlador para el registro de equipos
 */

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('form-registro-equipo');
  
  // Cargar usuarios para el selector de líderes
  await cargarUsuarios();
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Obtener la fecha actual si no se proporciona
        const fechaCreacion = document.getElementById('fechaCreacion').value || new Date().toISOString().split('T')[0];
        
        // Obtener los valores del formulario
        const nuevoEquipo = {
          id: 'eq' + Date.now(),
          nombre: document.getElementById('nombre').value,
          descripcion: document.getElementById('descripcion').value,
          lider: document.getElementById('lider').value,
          fechaCreacion: fechaCreacion,
          estado: document.getElementById('estado').value
        };
        
        console.log('Datos del equipo a registrar:', nuevoEquipo);
        
        // Enviar los datos a la API
        const response = await fetch('http://localhost:3000/equipos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoEquipo)
        });
        
        if (!response.ok) {
          throw new Error('Error al registrar equipo');
        }
        
        alert('Equipo registrado correctamente');
        
        // Redireccionar a la lista de equipos
        window.location.href = 'lista.html';
        
      } catch (error) {
        console.error('Error al registrar equipo:', error);
        alert('Error al registrar equipo');
      }
    });
  } else {
    console.error('No se encontró el formulario de registro de equipos');
  }
});

// Función para cargar usuarios en el selector de líderes
async function cargarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    const usuarios = await response.json();
    
    const liderSelect = document.getElementById('lider');
    if (!liderSelect) return;
    
    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.textContent = `${usuario.nombre} (${usuario.puesto})`;
      liderSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}