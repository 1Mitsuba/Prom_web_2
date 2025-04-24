/**
 * Controlador para la edición de usuarios
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Obtener el ID del usuario de la URL
  const params = new URLSearchParams(window.location.search);
  const usuarioId = params.get('id');
  
  if (!usuarioId) {
    alert('ID de usuario no especificado');
    window.location.href = 'lista.html';
    return;
  }
  
  const form = document.getElementById('form-edicion-usuario');
  
  if (!form) {
    console.error('No se encontró el formulario de edición');
    return;
  }
  
  try {
    // Cargar los datos actuales del usuario
    const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`);
    
    if (!response.ok) {
      throw new Error('Error al cargar los datos del usuario');
    }
    
    const usuario = await response.json();
    
    // Rellenar el formulario con los datos
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('email').value = usuario.email;
    document.getElementById('puesto').value = usuario.puesto;
    document.getElementById('departamento').value = usuario.departamento;
    
    if (document.getElementById('avatar')) {
      document.getElementById('avatar').value = usuario.avatar;
    }
    
    // Escuchar el evento submit del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        // Recoger los datos actualizados
        const usuarioActualizado = {
          id: usuarioId,
          nombre: document.getElementById('nombre').value,
          email: document.getElementById('email').value,
          puesto: document.getElementById('puesto').value,
          departamento: document.getElementById('departamento').value,
          avatar: document.getElementById('avatar') ? document.getElementById('avatar').value : usuario.avatar
        };
        
        // Enviar la petición PUT para actualizar el usuario
        const updateResponse = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuarioActualizado)
        });
        
        if (!updateResponse.ok) {
          throw new Error('Error al actualizar el usuario');
        }
        
        alert('Usuario actualizado correctamente');
        window.location.href = 'lista.html';
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        alert('Error al actualizar el usuario');
      }
    });
    
  } catch (error) {
    console.error('Error al cargar usuario:', error);
    alert('Error al cargar los datos del usuario');
    window.location.href = 'lista.html';
  }
});