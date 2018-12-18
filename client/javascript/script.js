/*
TODO:
[ ] add data attributes to input field so that we can reference
[ ] save state changes to DB
[ ] on click strike through and move to completed tasks
[ ] toggle text field edit with 'edit' button
[ ] maintain appended order when moving between 'Completed Tasks' and 'Todo List'
[ ] consider utilizing textarea instead of input
*/

//These JSON objects should be retrieved from sql database

const currentTasks = {
  'note1': {
    'content': 'this is note1 content',
    'percentage': .25
  },
  'note2': {
    'content': 'this is note2 content',
    'percentage': .25
  }
}

const completedTasks = {
  'note3': {
    'content': 'this is note3 content',
    'percentage': .50
  },
}

console.log('currentTasks values', currentTasks);

for (x in currentTasks) {
  console.log('x value', currentTasks[x]);
}

// document.querySelector('#section-title').innerHTML = 'testing the function';

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

//we pass in JSON object that contains task data
const generateTaskElement = (task) => {
  const newLi = document.createElement('li');
  const newInput = document.createElement('input');
  newInput.value = task.content;
  const percentage = document.createElement('input');
  percentage.value = task.percentage;
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'checked';
  const taskElement = {
    'newLi': newLi,
    'newInput': newInput,
    'percentage': percentage,
    'checkBox': checkBox
  }
  return taskElement;
}

const addNewTask = (task, container) => {
  taskElement = generateTaskElement(task);
  //function for eventlistner to move task to completed/incomplete
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
  //append elements to node to create new task element
  taskElement.newLi.appendChild(taskElement.newInput);
  taskElement.newLi.appendChild(taskElement.percentage);
  taskElement.newLi.appendChild(taskElement.checkBox);
  const todoContainer = container;
  todoContainer.appendChild(taskElement.newLi);
}

//generate current tasks from a JSON object
const populateCurrentTasks = (existingTasks) => {
  for (x in existingTasks) {
    console.log('x value in populateTasks', existingTasks[x]);
    addNewTask(existingTasks[x], document.getElementById('todo-container'));
  }
}

//generate completed tasks from JSON object
const populateCompletedTasks = (existingTasks) => {
  for (x in existingTasks) {
    console.log('x value in populateTasks', existingTasks[x]);
    addNewTask(existingTasks[x], document.getElementById('completed-container'));
  }
}

populateCurrentTasks(currentTasks);
populateCompletedTasks(completedTasks);

const addButton = document.getElementById('add-button');

addButton.addEventListener('click', function (event) {
  event.preventDefault();
  const taskValue = {
    'content': document.getElementById('task-input').value,
    'percentage': parseFloat(document.getElementById('task-percentage').value)
  }
  if (taskValue.content === '') {
    alert('you cannot have an empty task');
  }
  else {
    console.log('taskValue', taskValue);
    addNewTask(taskValue, document.getElementById('todo-container'));
    document.getElementById('task-input').value = '';
  }
})

const todoUl = document.querySelector('#todo-container')
const listItem = todoUl.getElementsByTagName('li');
const newNums = [];
for (let i=0; i < listItem.length; i++) {
    newNums.push( parseInt( listItem[i].innerHTML, 10 ) );
}

console.log('todoContainer current target', document.querySelector('#todo-container').currentTarget);

const calculatePercentageCompleted = () => {

}

document.querySelector('#percentage-completed').innerHTML = 'this will be the actual percentage';
