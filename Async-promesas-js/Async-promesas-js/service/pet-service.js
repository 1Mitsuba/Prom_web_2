/**
 * Servicio para gestionar mascotas en la plataforma
 * Contiene todas las operaciones CRUD para mascotas
 */

// Función para listar todas las mascotas registradas
const listaPets = () => {
    // Realizamos una petición GET a la API de mascotas
    return fetch("http://localhost:3000/pets")
      // Convertimos la respuesta a formato JSON
      .then(respuesta => respuesta.json());
  };
  
  // Función para crear una nueva mascota en la base de datos
  const crearPet = (nombre, raza, edad, propietario) => {
    // Realizamos una petición POST a la API con los datos de la nueva mascota
    return fetch("http://localhost:3000/pets", {
      // Especificamos el método HTTP para crear recursos
      method: "POST",
      // Definimos las cabeceras para indicar que enviamos JSON
      headers: {
        "Content-Type": "application/json"
      },
      // Convertimos el objeto JavaScript a una cadena JSON
      // Incluimos un ID único generado con uuid
      body: JSON.stringify({ 
        nombre, 
        raza, 
        edad, 
        propietario, // Nombre del propietario como texto
        id: uuid.v4() // Generamos un ID único para cada mascota
      })
    });
  };
  
  // Función para obtener una mascota específica por su ID
  const obtenerPet = (id) => {
    // Realizamos una petición GET a la API con el ID específico
    return fetch(`http://localhost:3000/pets/${id}`)
      // Convertimos la respuesta a formato JSON
      .then(respuesta => respuesta.json());
  };
  
  // Función para eliminar una mascota por su ID
  const eliminarPet = (id) => {
    // Realizamos una petición DELETE a la API con el ID de la mascota a eliminar
    return fetch(`http://localhost:3000/pets/${id}`, {
      // Especificamos el método HTTP para eliminar recursos
      method: "DELETE"
    });
  };
  
  // Función para actualizar una mascota existente
  const actualizarPet = (nombre, raza, edad, propietario, id) => {
    // Realizamos una petición PUT a la API con los datos actualizados
    return fetch(`http://localhost:3000/pets/${id}`, {
      // Usamos PUT para actualizar recursos existentes
      method: "PUT",
      // Definimos las cabeceras para indicar que enviamos JSON
      headers: {
        "Content-Type": "application/json"
      },
      // Convertimos el objeto con los datos actualizados a una cadena JSON
      body: JSON.stringify({ nombre, raza, edad, propietario })
    })
    // Convertimos la respuesta a formato JSON
    .then(respuesta => respuesta.json());
  };
  
  // Exportamos todas las funciones como un objeto para usarlas en otros archivos
  export const petService = {
    listaPets,
    crearPet,
    obtenerPet,
    eliminarPet,
    actualizarPet
  };