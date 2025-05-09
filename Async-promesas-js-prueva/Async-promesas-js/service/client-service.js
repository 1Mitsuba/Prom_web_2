/*const crear_nueva_fila=(nombre,email)=>{// recepciono datos 
    const fila = document.createElement('tr');// creo una nueva filla en la tabla
    //guardo html en una variable y tambien llamo a mis datos de entrada
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td>${email}</td>
            <td>
            <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button"
                    >
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>
            `;
        fila.innerHTML=contenido;
        return fila; 
};x


const table = document.querySelector("[data-table]");
*/

/*const lista_clientes=()=>{ metodo antiguo
    const promesa= new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest();//variable con request http y xml
        http.open("GET","http://localhost:3000/perfil");
        http.send();
        http.onload=()=>{
            const response = JSON.parse(http.response);//convierto que mi respuesta hhtp sea json
            if(http.response>=400){
                reject(response)
            } else{
                resolve(response)
            }
        };
    });
    return promesa;
}*/



/*
lista_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nuevafila= crear_nueva_fila(perfil.nombre,perfil.email);
            table.appendChild(nuevafila)
        });
    })
    .catch((error)=> alert("No existe conexión"));

*/

//---------optimizado---------
/*
const listaclientes=()=> fetch("http://localhost:3000/perfil").then((respuesta)=>respuesta.json());
const crearCliente=(nombre,email)=>{
    return fetch ("http://localhost:3000/perfil",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email, id: uuid.v4()})
    });

};
const eliminarCliente=(id)=>{
    console.log("elii",id)
    return fetch(`http://localhost:3000/perfil/${id}`,{
        method:"DELETE"
    });

;}
// referencia a un cliente del json a travez de id
const clientes=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta)=>respuesta.json())}

const actualizarCliente=(nombre,email,id)=>{ // ojoooo solo actualizo nombre y email NO ID
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({nombre,email})

        }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};



export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};
*/

// Define la constante con la URL de la API
const API_BASE_URL = 'http://localhost/api/conexciion1.php';

// Usa la constante en tu función fetch
fetch(API_BASE_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Datos recibidos:', data))
  .catch(error => console.error('Error de conexión:', error));


const listaclientes = () => {
  console.log("Solicitando lista de clientes");
  return fetch(API_BASE_URL)
    .then(respuesta => {
      console.log("Respuesta de API clientes:", respuesta.status);
      if(!respuesta.ok) {
        throw new Error(`Error al listar clientes: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then(data => {
      console.log("Datos de clientes recibidos:", data.length || 'sin datos');
      return Array.isArray(data) ? data : [];
    })
    .catch(error => {
      console.error("Error en listaclientes:", error);
      return [];
    });
};

const crearCliente = (nombre, email) => {
    console.log("Creando cliente:", { nombre, email });
    
    // Generar ID único 
    const id = 'cl_' + Math.random().toString(36).substring(2, 15);
    
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            email: email
        })
    })
    .then(response => {
        console.log("Respuesta del servidor:", response.status);
        if(!response.ok) {
            return response.text().then(text => {
                throw new Error(`Error ${response.status}: ${text}`);
            });
        }
        return response.json();
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error('Error al eliminar cliente');
        return response.json();
    });
};

const clientes = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener cliente');
            return response.json();
        });
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, id })
    }).then(response => {
        if (!response.ok) throw new Error('Error al actualizar cliente');
        return response.json();
    });
};

export const clientService = {
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};

/*
const API_BASE_URL='http://localhost/api1/conexion.php';
const listaclientes=()=>{
    return fetch(API_BASE_URL)
    .then(response=>{
        if(!response.ok)throw new Error('error clientes');
        return response.json();
    })
}
const crearCliente=(nombre,email)=>{
    return fetch(API_BASE_URL,{
        method:'POST',
        header:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            nombre,email,id:uuid.v4()
        })
    }).then(response=>{
        if(!response.ok)throw new Error('error crear clientes');
        return response.json();
    })
}
const eliminarCliente=(id)=>{
    
    return fetch(`${API_BASE_URL}?id=${id}`,{
        method:"DELETE"
    });

}
const clientes=(id)=>{
    return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta)=>respuesta.json())}

const actualizarCliente=(nombre,email,id)=>{ // ojoooo solo actualizo nombre y email NO ID
        return fetch(API_BASE_URL,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({nombre,email,id})
    
            }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
    };

export const clientService = {
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};
*/