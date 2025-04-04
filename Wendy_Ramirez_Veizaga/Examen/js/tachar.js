//Funcionalidad para el boton de tachar 
const tachar = document.querySelector('[data-btn-tachar]');

//Funcion Flecha para tachar el último elemento de la lista
const tacharElemento = () => {
    // Obtener todos los elementos de la lista
    const elementos = document.querySelectorAll('[data-list] li');
    
    // Verificar si hay elementos en la lista
    if (elementos.length === 0) {
        alert('No hay elementos en la lista para tachar');
        return;
    }
    
    // Obtener el último elemento de la lista
    const ultimoElemento = elementos[elementos.length - 1];
    
    // Aplicar o quitar la clase 'tachado' al último elemento
    ultimoElemento.classList.toggle('tachado');
}

// Conectar la función con el evento click del botón
tachar.addEventListener("click", tacharElemento);