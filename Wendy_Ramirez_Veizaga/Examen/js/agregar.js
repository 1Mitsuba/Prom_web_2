// Funcionalidad para el boton de agregar 
const agregar = document.querySelector('[data-btn]');

//Funcion Flecha para agregar un nuevo elemento a la lista
const agregarElemento = () => {
    // Obtener el valor del input
    const nuevoElemento = document.querySelector('[data-input]').value;
    //Si el input esta vacio mostrar un mensaje de error
    if (nuevoElemento === "") {
        alert("Por favor, ingrese un elemento.");
        return;
    }
    // Crear un nuevo elemento de lista
    const li = document.createElement("li");
    // Agregar la clase "item" al elemento
    li.classList.add("item");
    // Agregar el texto al nuevo elemento de lista
    li.textContent = nuevoElemento;
    // Agregar el nuevo elemento de lista a la lista existente
    document.querySelector('[data-list]').appendChild(li);
    // Limpiar el input
    document.querySelector('[data-input]').value = "";
    // Mostrar un mensaje de éxito
    alert("Elemento agregado correctamente!");
}
// Conectar la función con el evento click del botón
agregar.addEventListener("click", agregarElemento);
