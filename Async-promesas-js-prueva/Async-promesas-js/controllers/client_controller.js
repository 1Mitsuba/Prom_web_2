import {clientService} from "../service/client-service.js"
const crear_nueva_fila=(nombre,email,id)=>{// recepciono datos 
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
                    href="../screens/editar_cliente.html?id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button" id="${id}">
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>
            `;
        fila.innerHTML=contenido;
        const btn =fila.querySelector("button")
        btn.addEventListener("click",()=>{
            const id=btn.id;
            clientService.eliminarCliente(id)
                .then(respuesta=>{
                alert("eliminado")
                window.location.reload();// recarga la pagina
            }).catch(error=> alert("error"))

        })

        return fila; 
};

// _----------- mejorado codigo ordenado limpio--------------
const table = document.querySelector("[data-table]");

clientService
.listaclientes()
    .then((data)=>{
    data.forEach(({nombre,email,id}) => {
                const nuevaLinea= crear_nueva_fila(nombre,email,id)// llamo a 3 referencias
                table.appendChild(nuevaLinea)
                });
    console.log(data);// verifico datos 
}).catch((error)=>alert("ocurrio un error con clientes"));



//---------------------------
/*
import { clientService } from "../service/client-service.js";

const crear_nueva_fila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}"
                       class="simple-button simple-button--edit">
                       Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete"
                            type="button" id="${id}">
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            clientService.eliminarCliente(id)
                .then(() => {
                    fila.remove();
                    alert("Cliente eliminado correctamente");
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Error al eliminar el cliente");
                });
        }
    });

    return fila;
};

const table = document.querySelector("[data-table]");

clientService.listaclientes()
    .then(data => {
        data.forEach(({nombre, email, id}) => {
            const nuevaLinea = crear_nueva_fila(nombre, email, id);
            table.appendChild(nuevaLinea);
        });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al cargar los clientes");
    });
    */