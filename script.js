const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');

const taskDialog = document.getElementById('taskDialog');
const taskName = document.getElementById('taskName');
const taskDate = document.getElementById('taskDate');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

addTaskBtn.addEventListener('click', function() {
    taskName.value = '';
    taskDialog.showModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && taskDialog.open) {
        addTask();
    }
});

confirmBtn.addEventListener('click', addTask);

cancelBtn.addEventListener('click', taskDialog.close);

clearBtn.addEventListener('click', function() {
    tasks = tasks.filter(task => !task.completed);
    saveAndRenderTasks();
});

function addTask() {
    const taskText = taskName.value.trim();
    const dueDate = taskDate.value;

    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            date: dueDate,
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
            li.style.opacity = '0.6';
        }

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));

        if (task.date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const dueDate = new Date(task.date);
            let dueText = ' Due: ' + task.date;

            if (task.date < today.toISOString().split('T')[0]) {
                dueText = ` Due: ${task.date} (Overdue)`;
            } else if (task.date === today.toISOString().split('T')[0]) {
                dueText = ` Due: Today`;
            } else if (task.date === tomorrow.toISOString().split('T')[0]) {
                dueText = ` Due: Tomorrow`;
            } else if (task.date < new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0]) {
                dueText = ` Due: ${task.date} (This Week)`;
            }

            li.appendChild(document.createTextNode(`${dueText}`));
        }

        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.filter(task => !task.completed).length}`;
}