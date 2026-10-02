const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');

let tasks = [];

renderTasks();

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearBtn.addEventListener('click', function() {
    tasks = [];
    renderTasks();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        if (task.completed) {
            li.style.textDecoration = 'line-through';
        }

        taskList.appendChild(checkbox);
        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.length}`;
}