document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
        addTodoToDOM(todo);
    });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = {
            text: todoInput.value,
            completed: false
        };
        todos.push(newTodo);
        addTodoToDOM(newTodo);
        saveTodos();
        todoInput.value = '';
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.classList.toggle('completed', todo.completed);
        
        li.addEventListener('click', () => {
            todo.completed = !todo.completed;
            li.classList.toggle('completed', todo.completed);
            saveTodos();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            const index = todos.indexOf(todo);
            todos.splice(index, 1);
            saveTodos();
            li.remove();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

