/*
TODO:
[ ] on click strike through and move to completed tasks
[ ] toggle text field edit with 'edit' button
[ ] maintain appended order when moving between 'Completed Tasks' and 'Todo List'
*/

document.querySelector('#section-title').innerHTML = 'testing the function';

localStorage.setItem('isChecked', true);

const makeChecked = document.querySelector('#make-checked')
makeChecked.addEventListener('click', function(event) {
  event.preventDefault();
  document.querySelectorAll('.checked').forEach(function(e) {
    if (e.checked) {
      e.checked = false
    } else {
      e.checked = true;
    }
  })
})

const generateTaskElement = (task) => {
  const newLi = document.createElement('li');
  const newInput = document.createElement('input');
  newInput.value = task;
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'checked';
  const taskElement = {
    'newLi': newLi,
    'newInput': newInput,
    'checkBox': checkBox
  }
  return taskElement;
}

const addNewTask = (task) => {
  taskElement = generateTaskElement(task);
  const moveToCompleted = (event) => {
    event.preventDefault();
    const taskParentNode = event.currentTarget.parentNode;
    const taskParentId = taskParentNode.parentNode.getAttribute('id');
    const checkBoxValue = event.currentTarget;

    if (taskParentId === 'todo-container') {
      const completedContainer = document.getElementById('completed-container');
      completedContainer.appendChild(taskParentNode);
    }
    else {
      const todoContainer = document.getElementById('todo-container');
      todoContainer.appendChild(taskParentNode);
    }
  }

  taskElement.checkBox.addEventListener('click', function(event) {
    const checkBoxValue = event.currentTarget;
    moveToCompleted(event);
  });

  taskElement.newLi.appendChild(taskElement.newInput);
  taskElement.newLi.appendChild(taskElement.checkBox);
  const todoContainer = document.getElementById('todo-container');
  todoContainer.appendChild(taskElement.newLi);
}

const addButton = document.getElementById('add-button');

addButton.addEventListener('click', function (event) {
  event.preventDefault();
  const taskValue = document.getElementById('task-input').value;
  if (taskValue === '') {
    alert('you cannot have an empty task');
  }
  else {
    addNewTask(taskValue);
    document.getElementById('task-input').value = '';
  }
})

// addNewTask('testing this out');
