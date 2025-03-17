import checkComplete from './Componentes/checkComplete.js';
import deleteIcon from './Componentes/deleteIcon.js';
import editIcon from './Componentes/editTask.js';

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
    

     
    
    task.appendChild(contTask);
    task.appendChild(editIcon());
    task.appendChild(deleteIcon());
    list.appendChild(task);
    console.log(contenido);
}

//Evento para el boton
btn.addEventListener('click', createTask);

/*const checkComplete = ()=>{
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

*/
/*const deleteTask = (evento) => {
    const parent = evento.target.parentElement.parentElement;
    parent.remove();
}
*/
})();