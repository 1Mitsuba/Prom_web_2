/**
 * Controlador para la gestión de tareas
 */

// Variables para los datos obtenidos de la API
let todasLasTareas = [];
let proyectos = [];
let usuarios = [];

// Función para cargar datos necesarios
async function cargarDatos() {
  try {
    // Cargar tareas
    const tareasResponse = await fetch('http://localhost:3000/tareas');
    todasLasTareas = await tareasResponse.json();
    
    // Cargar proyectos para mostrar nombres
    const proyectosResponse = await fetch('http://localhost:3000/proyectos');
    proyectos = await proyectosResponse.json();
    
    // Cargar usuarios para mostrar asignados
    const usuariosResponse = await fetch('http://localhost:3000/usuarios');
    usuarios = await usuariosResponse.json();
    
    // Crear mapas para acceso rápido
    const proyectosMap = {};
    proyectos.forEach(proyecto => {
      proyectosMap[proyecto.id] = proyecto.nombre;
    });
    
    const usuariosMap = {};
    usuarios.forEach(usuario => {
      usuariosMap[usuario.id] = usuario.nombre;
    });
    
    // Configurar filtros
    configurarFiltros(proyectos);
    
    // Mostrar tareas inicialmente
    mostrarTareas(todasLasTareas, proyectosMap, usuariosMap);
    
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}

// Función para configurar los filtros
function configurarFiltros(proyectos) {
  const filtroProyecto = document.getElementById('filtro-proyecto');
  const filtroEstado = document.getElementById('filtro-estado');
  const filtroPrioridad = document.getElementById('filtro-prioridad');
  
  if (filtroProyecto) {
    // Agregar opciones de proyectos al filtro
    proyectos.forEach(proyecto => {
      const option = document.createElement('option');
      option.value = proyecto.id;
      option.textContent = proyecto.nombre;
      filtroProyecto.appendChild(option);
    });
    
    // Agregar evento change
    filtroProyecto.addEventListener('change', aplicarFiltros);
  }
  
  if (filtroEstado) {
    filtroEstado.addEventListener('change', aplicarFiltros);
  }
  
  if (filtroPrioridad) {
    filtroPrioridad.addEventListener('change', aplicarFiltros);
  }
}

// Función para aplicar filtros
function aplicarFiltros() {
  const proyectoSeleccionado = document.getElementById('filtro-proyecto').value;
  const estadoSeleccionado = document.getElementById('filtro-estado').value;
  const prioridadSeleccionada = document.getElementById('filtro-prioridad').value;
  
  // Filtrar tareas
  let tareasFiltradas = todasLasTareas;
  
  if (proyectoSeleccionado) {
    tareasFiltradas = tareasFiltradas.filter(tarea => tarea.proyectoId === proyectoSeleccionado);
  }
  
  if (estadoSeleccionado) {
    tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === estadoSeleccionado);
  }
  
  if (prioridadSeleccionada) {
    tareasFiltradas = tareasFiltradas.filter(tarea => tarea.prioridad === prioridadSeleccionada);
  }
  
  // Crear mapas para acceso rápido
  const proyectosMap = {};
  proyectos.forEach(proyecto => {
    proyectosMap[proyecto.id] = proyecto.nombre;
  });
  
  const usuariosMap = {};
  usuarios.forEach(usuario => {
    usuariosMap[usuario.id] = usuario.nombre;
  });
  
  // Mostrar tareas filtradas
  mostrarTareas(tareasFiltradas, proyectosMap, usuariosMap);
}

// Función para mostrar tareas en la tabla
function mostrarTareas(tareas, proyectosMap, usuariosMap) {
  const tabla = document.getElementById('tabla-tareas');
  
  if (!tabla) {
    console.error('No se encontró el elemento tabla-tareas');
    return;
  }
  
  tabla.innerHTML = '';
  
  tareas.forEach(tarea => {
    const nombreProyecto = proyectosMap[tarea.proyectoId] || 'Sin proyecto';
    const nombreAsignado = tarea.asignadoA ? usuariosMap[tarea.asignadoA] || 'Desconocido' : 'No asignado';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tarea.titulo}</td>
      <td>${nombreProyecto}</td>
      <td>${tarea.descripcion.substring(0, 30)}${tarea.descripcion.length > 30 ? '...' : ''}</td>
      <td>${nombreAsignado}</td>
      <td><span class="badge ${getPriorityBadgeClass(tarea.prioridad)}">${tarea.prioridad}</span></td>
      <td><span class="badge ${getStatusBadgeClass(tarea.estado)}">${tarea.estado}</span></td>
      <td>
        <a href="editar.html?id=${tarea.id}" class="btn btn-sm btn-primary">Editar</a>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${tarea.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(row);
  });
  
  // Agregar eventos de click a los botones de eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        try {
          const response = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            // Recargar datos
            await cargarDatos();
            alert('Tarea eliminada correctamente');
          }
        } catch (error) {
          console.error('Error al eliminar tarea:', error);
          alert('Error al eliminar tarea');
        }
      }
    });
  });
}

// Función para obtener la clase del badge según la prioridad
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

// Función para obtener la clase del badge según el estado
function getStatusBadgeClass(estado) {
  switch (estado) {
    case 'pendiente':
      return 'bg-secondary';
    case 'en progreso':
      return 'bg-primary';
    case 'completada':
      return 'bg-success';
    default:
      return 'bg-secondary';
  }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Controlador de tareas inicializado');
  cargarDatos();
});