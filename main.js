const tasks = [
    // {
    //     title: "Quản lý dự án",
    //     completed: false,
    // },
];

const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");
const todoInput = document.getElementById("todo-input");
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;
    const newTask = {
        title,
        completed: false,
    };
    tasks.push(newTask);
    todoInput.value = "";
    renderTasks();
});

function renderTasks() {
    const html = tasks
        .map(
            (task, index) => `
    <li class="task-item ${task.completed ? "completed" : ""}" data-index="${index}">
        <span class="task-title">${task.title}</span>
        <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${task.completed ? "Mark as undone" : "Mark as done"}</button>
            <button class="task-btn delete">Delete</button>
        </div>
    </li>
`,
        )
        .join("");
    taskList.innerHTML = html;
}
