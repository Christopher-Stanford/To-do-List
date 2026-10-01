const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');

let tasks = [];
let CompletedTasks = [];

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearBtn.addEventListener('click', function() {
    tasks = [];
    taskList.innerHTML = '';
    updateTaskCount();
});

function updateTaskCount() {
    taskCount.textContent = `${tasks.length}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText);
        taskList.innerHTML += `<li>${taskText}</li>`;
        taskInput.value = '';
        updateTaskCount();
    }
}