let todos = [];

function newTodo() {
    const input = document.getElementById('newTodo');
    const task = input.value.trim();
    if (task) {
        todos.push({ text: task, completed: false });
        input.value = '';
        render();
        updateCounter();
        saveTodos(); // Зберігаємо дані
    }
}

function renderTodo(todo, index) {
    return `
        <li class="${todo.completed ? 'completed' : ''}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="checkTodo(${index})">
            <label>${todo.text}</label>
            <button onclick="deleteTodo(${index})">Видалити</button>
        </li>
    `;
}

function render() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = todos.map((todo, index) => renderTodo(todo, index)).join('');
}

function updateCounter() {
    const totalCount = document.getElementById('totalCount');
    const pendingCount = document.getElementById('pendingCount');
    totalCount.textContent = todos.length;
    pendingCount.textContent = todos.filter(todo => !todo.completed).length;
}

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
    updateCounter();
    saveTodos(); // Зберігаємо дані
}

function checkTodo(index) {
    todos[index].completed = !todos[index].completed;
    render();
    updateCounter();
    saveTodos(); // Зберігаємо дані
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        render();
        updateCounter();
    }
}

window.onload = loadTodos;