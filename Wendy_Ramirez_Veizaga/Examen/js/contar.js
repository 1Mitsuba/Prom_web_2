//Funcionalidad para el boton de contar
const contar = document.querySelector('[data-btn-contar]');
//Funcion Flecha para contar los elementos de la lista
const contarElementos = () => {
    // Obtener todos los elementos de la lista
    const elementos = document.querySelectorAll('[data-list] li');
    // Contar el número de elementos
    const cantidad = elementos.length;
    // Mostrar la cantidad en un alert
    alert(`La lista contiene ${cantidad} elementos.`);
}
// Conectar la función con el evento click del botón
contar.addEventListener("click", contarElementos);