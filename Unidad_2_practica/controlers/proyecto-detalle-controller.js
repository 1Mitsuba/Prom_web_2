/**
 * Controlador para la página de detalle de proyecto
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
  
  try {
    // Cargar los datos del proyecto
    const proyectoResponse = await fetch(`http://localhost:3000/proyectos/${proyectoId}`);
    
    if (!proyectoResponse.ok) {
      throw new Error('Error al cargar los datos del proyecto');
    }
    
    const proyecto = await proyectoResponse.json();
    
    // Cargar información adicional: equipo del proyecto
    const equipoResponse = await fetch(`http://localhost:3000/equipos/${proyecto.equipoId}`);
    const equipo = equipoResponse.ok ? await equipoResponse.json() : { nombre: 'Equipo no encontrado' };
    
    // Mostrar información del proyecto
    mostrarDetalleProyecto(proyecto, equipo);
    
    // Actualizar enlace de "Nueva tarea"
    document.getElementById('btn-nueva-tarea').href = `../tareas/registro.html?proyectoId=${proyectoId}`;
    
    // Cargar las tareas asociadas al proyecto
    await cargarTareasProyecto(proyectoId);
    
  } catch (error) {
    console.error('Error al cargar el detalle del proyecto:', error);
    document.getElementById('proyecto-detalle').innerHTML = `
      <div class="alert alert-danger">
        <h4>Error</h4>
        <p>No se pudo cargar el detalle del proyecto. ${error.message}</p>
        <a href="lista.html" class="btn btn-primary">Volver a la lista</a>
      </div>
    `;
  }
});

/**
 * Muestra los detalles del proyecto en la página
 */
function mostrarDetalleProyecto(proyecto, equipo) {
  const contenedor = document.getElementById('proyecto-detalle');
  
  const estadoClass = getBadgeClass(proyecto.estado);
  const fechaInicio = formatDate(proyecto.fechaInicio);
  const fechaLimite = formatDate(proyecto.fechaLimite);
  
  contenedor.innerHTML = `
    <div class="card">
      <div class="card-header bg-light">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">${proyecto.nombre}</h2>
          <span class="badge ${estadoClass} fs-6">${proyecto.estado}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-8">
            <h5>Descripción</h5>
            <p class="text-muted">${proyecto.descripcion}</p>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h6>Información general</h6>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Equipo:</span>
                    <span class="text-primary">${equipo.nombre}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Fecha de inicio:</span>
                    <span>${fechaInicio}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Fecha límite:</span>
                    <span>${fechaLimite}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="d-flex gap-2 justify-content-end">
          <a href="lista.html" class="btn btn-secondary">Volver</a>
          <a href="editar.html?id=${proyecto.id}" class="btn btn-primary">Editar</a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Carga las tareas asociadas al proyecto
 */
async function cargarTareasProyecto(proyectoId) {
  try {
    // Obtener todas las tareas
    const response = await fetch('http://localhost:3000/tareas');
    
    if (!response.ok) {
      throw new Error('Error al cargar las tareas');
    }
    
    const tareas = await response.json();
    
    // Filtrar las tareas que pertenecen al proyecto
    const tareasProyecto = tareas.filter(tarea => tarea.proyectoId === proyectoId);
    
    // Obtener la tabla y el mensaje de no tareas
    const tabla = document.getElementById('tareas-proyecto');
    const noTareas = document.getElementById('no-tareas');
    
    if (tareasProyecto.length === 0) {
      // No hay tareas para mostrar
      tabla.innerHTML = '';
      noTareas.classList.remove('d-none');
      return;
    }
    
    // Ocultar el mensaje de no tareas
    noTareas.classList.add('d-none');
    
    // Cargar usuarios para mostrar nombres
    const usuariosResponse = await fetch('http://localhost:3000/usuarios');
    const usuarios = await usuariosResponse.json();
    
    // Crear un mapa de usuarios para fácil acceso
    const usuariosMap = {};
    usuarios.forEach(usuario => {
      usuariosMap[usuario.id] = usuario.nombre;
    });
    
    // Mostrar las tareas en la tabla
    tabla.innerHTML = '';
    
    tareasProyecto.forEach(tarea => {
      const row = document.createElement('tr');
      const nombreAsignado = tarea.asignadoA ? usuariosMap[tarea.asignadoA] || 'Desconocido' : 'No asignado';
      
      row.innerHTML = `
        <td>${tarea.titulo}</td>
        <td>${tarea.descripcion.substring(0, 30)}${tarea.descripcion.length > 30 ? '...' : ''}</td>
        <td>${nombreAsignado}</td>
        <td><span class="badge ${getPriorityBadgeClass(tarea.prioridad)}">${tarea.prioridad}</span></td>
        <td><span class="badge ${getStatusBadgeClass(tarea.estado)}">${tarea.estado}</span></td>
        <td>
          <a href="../tareas/editar.html?id=${tarea.id}" class="btn btn-sm btn-primary">Editar</a>
        </td>
      `;
      
      tabla.appendChild(row);
    });
    
  } catch (error) {
    console.error('Error al cargar las tareas del proyecto:', error);
    document.getElementById('tareas-proyecto').innerHTML = `
      <tr>
        <td colspan="6" class="text-center">
          <div class="alert alert-warning mb-0">
            Error al cargar las tareas
          </div>
        </td>
      </tr>
    `;
  }
}

/**
 * Obtiene la clase de badge según el estado
 */
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

/**
 * Obtiene la clase de badge según la prioridad
 */
function getPriorityBadgeClass(prioridad) {
  switch (prioridad) {
    case 'alta':
      return 'bg-danger';
    case 'media':
      return 'bg-warning text-dark';
    case 'baja':
      return 'bg-info';
    default:
      return 'bg-secondary';
  }
}

/**
 * Obtiene la clase de badge según el estado de la tarea
 */
function getStatusBadgeClass(estado) {
  switch (estado) {
    case 'pendiente':
      return 'bg-secondary';
    case 'en progreso':
      return 'bg-primary';
    case 'completada':
      return 'bg-success';
    case 'cancelada':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}

/**
 * Formatea una fecha en formato legible
 */
function formatDate(dateString) {
  if (!dateString) return 'No definida';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}