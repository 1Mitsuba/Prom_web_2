(() => {
const btn = document.querySelector('[data-form-btn]');

console.log(btn);

//Funcion para recuperrar el texto del input 
const createTask = (evento)=>{
    evento.preventDefault();
    const input = document.querySelector('[data-form-input]');
    console.log(input.value);
    const value = input.value;
    const list = document.querySelector('[data-list]');
    const task = document.createElement('li');
    task.classList.add('card');
    input.value = '';
    /*const contenido = `<div>
    
                <i class="far fa-check-square icon"></i>
                <span class="task">${value}</span>
                </div>
                <i class="fas fa-trash-alt trashIcon icon"></i>
            `;
    */
    const contTask = document.createElement('div');
    contTask.appendChild(checkComplete());


    const titleTask = document.createElement('span');
    titleTask.classList.add('task');
    titleTask.innerText = value;
    contTask.appendChild(titleTask);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
    deleteIcon.addEventListener('click', deleteTask);
    contTask.appendChild(deleteIcon);

    task.appendChild(contTask);
    list.appendChild(task);
    console.log(contenido);
}

//Evento para el boton
btn.addEventListener('click', createTask);

const checkComplete = ()=>{
    const i = document.createElement('i');//creacion del icono
    i.classList.add("far","fa-check-square","icon");//Estilos del icono  
    i.addEventListener('click', color);//Evento para cambiar de color
    return i;
}
const color = (evento)=>{
    const elemento = evento.target;
    elemento.classList.add('fas');
    elemento.classList.add('CompleteIcon');
    elemento.classList.remove('far');
}
const deleteTask = (evento) => {
    const parent = evento.target.parentElement.parentElement;
    parent.remove();
}

})();