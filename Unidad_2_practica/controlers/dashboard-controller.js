/**
 * Controlador para el Dashboard
 * Muestra estadísticas y datos generales de la aplicación
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Inicializando dashboard...');
    
    try {
      // Cargar contadores
      await actualizarContadores();
      
      // Cargar proyectos recientes
      await cargarProyectosRecientes();
      
      // Cargar tareas pendientes
      await cargarTareasPendientes();
      
    } catch (error) {
      console.error('Error al cargar el dashboard:', error);
      mostrarError('Error al cargar datos del dashboard');
    }
  });
  
  /**
   * Actualiza los contadores del dashboard
   */
  async function actualizarContadores() {
    try {
      console.log('Actualizando contadores...');
      
      // Obtener datos de la API
      const [usuarios, equipos, proyectos, tareas] = await Promise.all([
        fetch('http://localhost:3000/usuarios').then(res => res.json()),
        fetch('http://localhost:3000/equipos').then(res => res.json()),
        fetch('http://localhost:3000/proyectos').then(res => res.json()),
        fetch('http://localhost:3000/tareas').then(res => res.json())
      ]);
      
      console.log(`Usuarios: ${usuarios.length}, Equipos: ${equipos.length}, Proyectos: ${proyectos.length}, Tareas: ${tareas.length}`);
      
      // Actualizar los contadores en el HTML
      const contadorUsuarios = document.getElementById('contador-usuarios');
      const contadorEquipos = document.getElementById('contador-equipos');
      const contadorProyectos = document.getElementById('contador-proyectos');
      const contadorTareas = document.getElementById('contador-tareas');
      
      if (contadorUsuarios) contadorUsuarios.textContent = usuarios.length;
      if (contadorEquipos) contadorEquipos.textContent = equipos.length;
      if (contadorProyectos) contadorProyectos.textContent = proyectos.length;
      if (contadorTareas) contadorTareas.textContent = tareas.length;
      
    } catch (error) {
      console.error('Error al actualizar contadores:', error);
      throw error;
    }
  }
  
  /**
   * Carga los proyectos recientes en la tabla
   */
  async function cargarProyectosRecientes() {
    try {
      console.log('Cargando proyectos recientes...');
      
      const tablaProyectos = document.getElementById('tabla-proyectos-recientes');
      
      if (!tablaProyectos) {
        console.warn('No se encontró la tabla de proyectos recientes');
        return;
      }
      
      // Obtener proyectos
      const proyectos = await fetch('http://localhost:3000/proyectos')
        .then(res => res.json());
      
      // Ordenar por fecha de inicio (más recientes primero)
      proyectos.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
      
      // Tomar solo los 5 más recientes
      const proyectosRecientes = proyectos.slice(0, 5);
      
      if (proyectosRecientes.length === 0) {
        tablaProyectos.innerHTML = `
          <tr>
            <td colspan="3" class="text-center">No hay proyectos registrados</td>
          </tr>
        `;
        return;
      }
      
      // Mostrar proyectos en la tabla
      tablaProyectos.innerHTML = '';
      
      proyectosRecientes.forEach(proyecto => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td><a href="screens/proyectos/detalle.html?id=${proyecto.id}">${proyecto.nombre}</a></td>
          <td><span class="badge ${getBadgeClass(proyecto.estado)}">${proyecto.estado}</span></td>
          <td>${formatDate(proyecto.fechaLimite)}</td>
        `;
        
        tablaProyectos.appendChild(row);
      });
      
    } catch (error) {
      console.error('Error al cargar proyectos recientes:', error);
      throw error;
    }
  }
  
  /**
   * Carga las tareas pendientes en la tabla
   */
  async function cargarTareasPendientes() {
    try {
      console.log('Cargando tareas pendientes...');
      
      const tablaTareas = document.getElementById('tabla-tareas-pendientes');
      
      if (!tablaTareas) {
        console.warn('No se encontró la tabla de tareas pendientes');
        return;
      }
      
      // Obtener tareas y proyectos
      const [tareas, proyectos, usuarios] = await Promise.all([
        fetch('http://localhost:3000/tareas').then(res => res.json()),
        fetch('http://localhost:3000/proyectos').then(res => res.json()),
        fetch('http://localhost:3000/usuarios').then(res => res.json())
      ]);
      
      // Filtrar solo las tareas pendientes o en progreso
      const tareasPendientes = tareas
        .filter(tarea => tarea.estado === 'pendiente' || tarea.estado === 'en progreso')
        .sort((a, b) => {
          // Prioridad alta primero
          const prioridadOrden = { 'alta': 1, 'media': 2, 'baja': 3 };
          return prioridadOrden[a.prioridad || 'baja'] - prioridadOrden[b.prioridad || 'baja'];
        })
        .slice(0, 5); // Tomar solo las 5 más prioritarias
      
      // Crear mapas para acceso rápido
      const proyectosMap = {};
      proyectos.forEach(proyecto => {
        proyectosMap[proyecto.id] = proyecto.nombre;
      });
      
      const usuariosMap = {};
      usuarios.forEach(usuario => {
        usuariosMap[usuario.id] = usuario.nombre;
      });
      
      if (tareasPendientes.length === 0) {
        tablaTareas.innerHTML = `
          <tr>
            <td colspan="4" class="text-center">No hay tareas pendientes</td>
          </tr>
        `;
        return;
      }
      
      // Mostrar tareas en la tabla
      tablaTareas.innerHTML = '';
      
      tareasPendientes.forEach(tarea => {
        const row = document.createElement('tr');
        const nombreProyecto = proyectosMap[tarea.proyectoId] || 'Sin proyecto';
        const nombreAsignado = tarea.asignadoA ? usuariosMap[tarea.asignadoA] || 'Desconocido' : 'No asignado';
        
        row.innerHTML = `
          <td><a href="screens/tareas/editar.html?id=${tarea.id}">${tarea.titulo}</a></td>
          <td>${nombreProyecto}</td>
          <td><span class="badge ${getPriorityBadgeClass(tarea.prioridad || 'media')}">${tarea.prioridad || 'media'}</span></td>
          <td>${nombreAsignado}</td>
        `;
        
        tablaTareas.appendChild(row);
      });
      
    } catch (error) {
      console.error('Error al cargar tareas pendientes:', error);
      throw error;
    }
  }
  
  /**
   * Muestra un mensaje de error en el dashboard
   */
  function mostrarError(mensaje) {
    const main = document.querySelector('main');
    
    if (!main) return;
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.textContent = mensaje;
    
    main.insertBefore(alert, main.firstChild);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
  
  /**
   * Obtiene la clase de badge según el estado del proyecto
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
   * Obtiene la clase de badge según la prioridad de la tarea
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
   * Formatea una fecha en formato legible
   */
  function formatDate(dateString) {
    if (!dateString) return 'No definida';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }