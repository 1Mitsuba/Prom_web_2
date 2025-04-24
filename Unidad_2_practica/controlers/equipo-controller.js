/**
 * Controlador para la gestión de equipos
 */

// Función para cargar la lista de equipos
async function cargarEquipos() {
  try {
    // Realizar una solicitud GET a la API
    const response = await fetch('http://localhost:3000/equipos');
    
    if (!response.ok) {
      throw new Error('Error al cargar equipos');
    }
    
    const equipos = await response.json();
    
    // Para mostrar el nombre del líder, obtener usuarios
    const usuariosResponse = await fetch('http://localhost:3000/usuarios');
    const usuarios = await usuariosResponse.json();
    
    // Crear un mapa de usuarios para fácil acceso
    const usuariosMap = {};
    usuarios.forEach(usuario => {
      usuariosMap[usuario.id] = usuario.nombre;
    });
    
    const tabla = document.getElementById('tabla-equipos');
    
    if (!tabla) {
      console.error('No se encontró el elemento tabla-equipos');
      return;
    }
    
    tabla.innerHTML = '';
    
    equipos.forEach(equipo => {
      const nombreLider = usuariosMap[equipo.lider] || 'Sin líder asignado';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${equipo.nombre}</td>
        <td>${equipo.descripcion.substring(0, 50)}${equipo.descripcion.length > 50 ? '...' : ''}</td>
        <td>${nombreLider}</td>
        <td>${formatDate(equipo.fechaCreacion)}</td>
        <td><span class="badge ${getStatusBadgeClass(equipo.estado)}">${equipo.estado}</span></td>
        <td>
          <a href="editar.html?id=${equipo.id}" class="btn btn-sm btn-primary">Editar</a>
          <button class="btn btn-sm btn-danger btn-eliminar" data-id="${equipo.id}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(row);
    });
    
    // Agregar eventos de click a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm('¿Estás seguro de eliminar este equipo?')) {
          try {
            const response = await fetch(`http://localhost:3000/equipos/${id}`, {
              method: 'DELETE'
            });
            if (response.ok) {
              cargarEquipos();
              alert('Equipo eliminado correctamente');
            }
          } catch (error) {
            console.error('Error al eliminar equipo:', error);
            alert('Error al eliminar equipo');
          }
        }
      });
    });
    
  } catch (error) {
    console.error('Error al cargar equipos:', error);
  }
}

// Función para formatear fechas
function formatDate(dateString) {
  if (!dateString) return 'No definida';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Función para obtener la clase del badge según el estado
function getStatusBadgeClass(estado) {
  switch (estado) {
    case 'activo':
      return 'bg-success';
    case 'inactivo':
      return 'bg-secondary';
    case 'en pausa':
      return 'bg-warning';
    default:
      return 'bg-secondary';
  }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Controlador de equipos inicializado');
  cargarEquipos();
});