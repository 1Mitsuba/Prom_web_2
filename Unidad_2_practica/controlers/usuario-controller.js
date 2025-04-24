import { usuarioService } from '../services/usuario-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await cargarUsuarios();
    
    // Actualizar contador en dashboard si estamos en index.html
    const contadorUsuarios = document.getElementById('contador-usuarios');
    if (contadorUsuarios) {
      const usuarios = await usuarioService.listar();
      contadorUsuarios.textContent = usuarios.length;
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
});

async function cargarUsuarios() {
  try {
    const usuarios = await usuarioService.listar();
    const tabla = document.getElementById('tabla-usuarios');
    
    if (!tabla) return;
    
    tabla.innerHTML = '';
    
    usuarios.forEach(usuario => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.puesto}</td>
        <td>${usuario.departamento}</td>
        <td>
          <a href="editar.html?id=${usuario.id}" class="btn btn-sm btn-outline-primary">Editar</a>
          <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${usuario.id}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(row);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', async (event) => {
        if (confirm('¿Está seguro que desea eliminar este usuario?')) {
          const userId = event.target.dataset.id;
          try {
            await usuarioService.eliminar(userId);
            alert('Usuario eliminado con éxito');
            await cargarUsuarios(); // Recargar la tabla
          } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar usuario');
          }
        }
      });
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    alert('Error al cargar los usuarios');
  }
}