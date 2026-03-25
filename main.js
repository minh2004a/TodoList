const tasks = [
    // {
    //     title: "Quản lý dự án",
    //     completed: false,
    // },
];

const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");
const todoInput = document.getElementById("todo-input");
taskList.addEventListener("click", (e) => {
    const target = e.target;
    const taskItem = target.closest(".task-item");
    if (!taskItem) return;
    const index = taskItem.getAttribute("data-index");
    if (target.closest(".edit")) {
        const newTitle = prompt(`Edit task title:`, tasks[index].title);
        if (!newTitle || newTitle.trim() === "") return;
        tasks[index].title = newTitle;
        renderTasks();
    } else if (target.closest(".done")) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    } else if (target.closest(".delete")) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            renderTasks();
        }
    }
});
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
