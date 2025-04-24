/**
 * Controlador para la gestión de proyectos
 */

// Función para cargar la lista de proyectos
async function cargarProyectos() {
  try {
    // Realizar una solicitud GET a la API
    const response = await fetch('http://localhost:3000/proyectos');
    
    if (!response.ok) {
      throw new Error('Error al cargar proyectos');
    }
    
    const proyectos = await response.json();
    
    // Para mostrar el nombre del equipo, obtener los equipos
    const equiposResponse = await fetch('http://localhost:3000/equipos');
    const equipos = await equiposResponse.json();
    
    // Crear un mapa de equipos para fácil acceso
    const equiposMap = {};
    equipos.forEach(equipo => {
      equiposMap[equipo.id] = equipo.nombre;
    });
    
    const tabla = document.getElementById('tabla-proyectos');
    
    if (!tabla) {
      console.error('No se encontró el elemento tabla-proyectos');
      return;
    }
    
    tabla.innerHTML = '';
    
    proyectos.forEach(proyecto => {
      const nombreEquipo = equiposMap[proyecto.equipoId] || 'Sin equipo asignado';
      
      // ...dentro de la función cargarProyectos()
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${proyecto.nombre}</td>
        <td>${proyecto.descripcion.substring(0, 50)}${proyecto.descripcion.length > 50 ? '...' : ''}</td>
        <td>${nombreEquipo}</td>
        <td>${formatDate(proyecto.fechaInicio)}</td>
        <td>${formatDate(proyecto.fechaLimite)}</td>
        <td><span class="badge ${getBadgeClass(proyecto.estado)}">${proyecto.estado}</span></td>
        <td class="text-center">
          <div class="btn-group btn-group-action" role="group">
            <a href="detalle.html?id=${proyecto.id}" class="btn btn-sm btn-outline-info" title="Ver detalles">
              <i class="bi bi-eye-fill"></i> Ver
            </a>
            <a href="editar.html?id=${proyecto.id}" class="btn btn-sm btn-outline-primary" title="Editar proyecto">
              <i class="bi bi-pencil-fill"></i> Editar
            </a>
            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${proyecto.id}" title="Eliminar proyecto">
              <i class="bi bi-trash-fill"></i> Eliminar
            </button>
          </div>
        </td>
      `;
      tabla.appendChild(row);
    });
    
    // Agregar eventos de click a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm('¿Estás seguro de eliminar este proyecto?')) {
          try {
            const response = await fetch(`http://localhost:3000/proyectos/${id}`, {
              method: 'DELETE'
            });
            if (response.ok) {
              cargarProyectos();
              alert('Proyecto eliminado correctamente');
            }
          } catch (error) {
            console.error('Error al eliminar proyecto:', error);
            alert('Error al eliminar proyecto');
          }
        }
      });
    });
    
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
  }
}

// Función para formatear fechas
function formatDate(dateString) {
  if (!dateString) return 'No definida';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Función para obtener la clase del badge según el estado
function getBadgeClass(estado) {
  switch (estado) {
    case 'pendiente':
      return 'bg-secondary';
    case 'en progreso':
      return 'bg-primary';
    case 'completado':
      return 'bg-success';
    case 'cancelado':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Controlador de proyectos inicializado');
  cargarProyectos();
});