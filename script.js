const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');

const taskDialog = document.getElementById('taskDialog');
const taskName = document.getElementById('taskName');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

addTaskBtn.addEventListener('click', function() {
    taskName.value = '';
    taskDialog.showModal();
});

confirmBtn.addEventListener('click', addTask);

cancelBtn.addEventListener('click', taskDialog.close);

taskName.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearBtn.addEventListener('click', function() {
    tasks = tasks.filter(task => !task.completed);
    saveAndRenderTasks();
});

function addTask() {
    const taskText = taskName.value.trim();
    if (taskText) {

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskName.value = '';
        saveAndRenderTasks();
    }
    taskDialog.close();
}

function saveAndRenderTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', function() {
            task.completed = checkbox.checked;
            saveAndRenderTasks();
        });

        if (task.completed) {
            li.style.opacity = '0.7';
        }

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));
        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.filter(task => !task.completed).length}`;
}