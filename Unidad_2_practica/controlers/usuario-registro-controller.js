import { usuarioService } from '../services/usuario-service.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro-usuario');
  
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      try {
        const formData = new FormData(form);
        const usuario = {
          nombre: formData.get('nombre'),
          email: formData.get('email'),
          puesto: formData.get('puesto'),
          departamento: formData.get('departamento'),
          avatar: formData.get('avatar') || 'default-avatar.jpg'
        };
        
        await usuarioService.crear(usuario);
        alert('Usuario registrado con éxito');
        window.location.href = 'lista.html';
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    });
  }
});