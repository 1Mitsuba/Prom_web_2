const checkComplete = ()=>{
    const i = document.createElement('i');//creacion del icono
    i.classList.add("far","fa-check-square","icon");//Estilos del icono  
    i.addEventListener('click', color);//Evento para cambiar de color
    return i;
}

const color = (evento)=>{
    const elemento = evento.target;
    
    if(elemento.classList.contains('far')) {
        // Si está sin marcar, lo marcamos como completo
        elemento.classList.replace('far', 'fas');
        elemento.classList.add('CompleteIcon');
    } else {
        // Si ya está marcado, lo desmarcamos
        elemento.classList.replace('fas', 'far');
        elemento.classList.remove('CompleteIcon');
    }

}
export default checkComplete;