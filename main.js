const tasks = [
    {
        title: "Quản lý dự án",
        completed: false,
    },
];

const taskList = document.getElementById("task-list");
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
