/**
 * Controlador para la edición de equipos
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Obtener el ID del equipo de la URL
  const params = new URLSearchParams(window.location.search);
  const equipoId = params.get('id');
  
  if (!equipoId) {
    alert('ID de equipo no especificado');
    window.location.href = 'lista.html';
    return;
  }
  
  const form = document.getElementById('form-edicion-equipo');
  
  if (!form) {
    console.error('No se encontró el formulario de edición');
    return;
  }
  
  try {
    // Cargar los usuarios para el selector de líderes
    await cargarUsuarios();
    
    // Cargar los datos actuales del equipo
    const response = await fetch(`http://localhost:3000/equipos/${equipoId}`);
    
    if (!response.ok) {
      throw new Error('Error al cargar los datos del equipo');
    }
    
    const equipo = await response.json();
    
    // Rellenar el formulario con los datos
    document.getElementById('nombre').value = equipo.nombre;
    document.getElementById('descripcion').value = equipo.descripcion;
    document.getElementById('lider').value = equipo.lider;
    document.getElementById('fechaCreacion').value = equipo.fechaCreacion;
    document.getElementById('estado').value = equipo.estado;
    
    // Escuchar el evento submit del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Recoger los datos actualizados
        const equipoActualizado = {
          id: equipoId,
          nombre: document.getElementById('nombre').value,
          descripcion: document.getElementById('descripcion').value,
          lider: document.getElementById('lider').value,
          fechaCreacion: document.getElementById('fechaCreacion').value,
          estado: document.getElementById('estado').value
        };
        
        // Enviar la petición PUT para actualizar el equipo
        const updateResponse = await fetch(`http://localhost:3000/equipos/${equipoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(equipoActualizado)
        });
        
        if (!updateResponse.ok) {
          throw new Error('Error al actualizar el equipo');
        }
        
        alert('Equipo actualizado correctamente');
        window.location.href = 'lista.html';
      } catch (error) {
        console.error('Error al actualizar equipo:', error);
        alert('Error al actualizar el equipo');
      }
    });
    
  } catch (error) {
    console.error('Error al cargar equipo:', error);
    alert('Error al cargar los datos del equipo');
    window.location.href = 'lista.html';
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