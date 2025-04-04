// Buscar la lista en la página
const miLista = document.querySelector('[data-list]');

// Decirle a la lista que esté atenta a los clics
miLista.addEventListener('click', function(evento) {
    // Guardar el elemento donde se hizo clic
    const elementoClicado = evento.target;
    
    // Verificar si es un elemento de la lista (li)
    if (elementoClicado.tagName === 'LI') {
        //Cambiar o quitar el color de fondo
        elementoClicado.classList.toggle('relleno');
    }
});