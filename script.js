let todos = [];

function newTodo() {
  console.log('newTodo called'); // Перевірка виклику функції
  const todoText = prompt('Введіть нове завдання:');
  if (todoText && todoText.trim() !== '') {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      checked: false
    };
    todos.push(newTodo);
    console.log(todos); // Перевірка збережених даних
    render();
    updateCounter();
  } else {
    alert('Завдання не може бути порожнім!');
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onClick="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  console.log('render called'); // Перевірка виклику функції
  list.innerHTML = todos.map(renderTodo).join('');
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
    updateCounter();
  }
}
