const editIcon = () => {
    const i = document.createElement('i');
    i.classList.add("fas", "fa-edit", "editIcon", "icon");
    i.addEventListener('click', editTask);
    return i;
};

const editTask = (evento) => {
    const taskElement = evento.target.parentElement.querySelector('.task');
    const currentText = taskElement.textContent;
    
    // Create input element for editing
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = currentText;
    inputElement.classList.add('editInput');
    
    // Replace span with input temporarily
    const taskParent = taskElement.parentElement;
    taskParent.replaceChild(inputElement, taskElement);
    inputElement.focus();
    
    // Handle when user is done editing
    inputElement.addEventListener('blur', () => {
        finishEditing(inputElement, taskElement, taskParent);
    });
    
    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            finishEditing(inputElement, taskElement, taskParent);
        }
    });
};

const finishEditing = (inputElement, taskElement, taskParent) => {
    // Update task text with new input value
    taskElement.textContent = inputElement.value;
    // Replace input back with the original span
    taskParent.replaceChild(taskElement, inputElement);
};

export default editIcon;