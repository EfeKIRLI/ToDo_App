
const form = document.getElementById('form'); // form
const input = document.getElementById('input'); // input
const todosList = document.getElementById('todos'); // ul

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = input.value.trim(); // trim whitespace from input value

  if (todoText !== '') {
    const todoEl = document.createElement('li');
    todoEl.innerText = todoText;
    todosList.appendChild(todoEl); // append new todo to the list
    input.value = ''; // reset input value

    // add event listeners to the new todo element
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// load todos from local storage on page load
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => {
    const todoEl = document.createElement('li');
    todoEl.innerText = todo.text;
    if (todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosList.appendChild(todoEl);
  });
}

