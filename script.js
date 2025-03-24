class Task {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.completed = false; 
    }
}

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('tasks');
const addTaskBtn = document.getElementById('addTaskBtn');
const filterSelect = document.getElementById('filterTasks');

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    tasks
        .filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true; // 'all' filter
        })
        .forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
<span><strong>${task.name}:</strong> ${task.description}</span>
<div>
<button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
<button onclick="editTask(${index})">Edit</button>
<button onclick="deleteTask(${index})">Delete</button>
</div>
            `;
            taskList.appendChild(li);
        });
}

function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const description = document.getElementById('taskDescription').value.trim();

    if (!name) {
        alert('Task name cannot be empty!');
        return;
    }

    const task = new Task(name, description);
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    const newName = prompt('Enter new task name:', tasks[index].name);
    const newDescription = prompt('Enter new task description:', tasks[index].description);

    if (newName && newDescription) {
        tasks[index].name = newName.trim();
        tasks[index].description = newDescription.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

filterSelect.addEventListener('change', () => {
    renderTasks(filterSelect.value);
});

addTaskBtn.addEventListener('click', addTask);
renderTasks();
