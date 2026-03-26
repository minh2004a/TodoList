const loader = JSON.parse(localStorage.getItem("tasks"));
const tasks = loader || [];

const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");
const todoInput = document.getElementById("todo-input");

// Lưu trữ tasks vào localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Hàm kiểm tra trùng lặp title
function isDuplicate(title, index = -1) {
    return tasks.some(
        (task, i) =>
            task.title.toLowerCase() === title.toLowerCase() && i !== index,
    );
}
// Sử dụng event delegation để xử lý các hành động trên task items
function handleTaskActions(e) {
    const target = e.target;
    const taskItem = target.closest(".task-item");
    // Xử lý trường hợp click vào phần tử không phải là task item (ví dụ: click vào No tasks yet message)
    if (!taskItem) return;
    const index = +taskItem.getAttribute("data-index");
    const task = tasks[index];
    if (target.classList.contains("edit")) {
        let newTitle = prompt(
            `Enter new title for task: ${task.title}`,
            task.title,
        );
        if (newTitle === null) return; // User cancelled the prompt

        if (newTitle.length > 20) {
            alert("Title cannot be longer than 20 characters!");
            return;
        }

        newTitle = newTitle.trim();
        if (!newTitle) {
            alert("Title cannot be empty!");
            return;
        }
        if (isDuplicate(newTitle, index)) {
            alert("Task already exists!");
            return;
        }
        task.title = newTitle;
        saveTasks();
        renderTasks();
    }
    if (target.classList.contains("done")) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
    if (target.classList.contains("delete")) {
        if (!confirm(`Are you sure you want to delete task: ${task.title}?`))
            return;
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Thêm task mới
function addTask(e) {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;
    if (isDuplicate(title)) {
        alert("Task already exists!");
        return;
    }
    const newTask = {
        title,
        completed: false,
    };
    tasks.push(newTask);
    todoInput.value = "";
    saveTasks();
    renderTasks();
}

// Render danh sách task ra giao diện
function renderTasks() {
    if (!tasks.length) {
        taskList.innerHTML = `<li id="empty-message" class="empty-message">No tasks yet. Add one above!</li>`;
        return;
    }
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

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);
renderTasks();
