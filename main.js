// Lấy tasks từ localStorage hoặc khởi tạo mảng rỗng nếu không có
const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

// hàm lưu tasks vào localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function isDuplicateTask(newTitle, excludeIndex = -1) {
    return tasks.some(
        (task, index) =>
            index !== excludeIndex &&
            task.title.toLowerCase() === newTitle.toLowerCase(),
    );
}
taskList.addEventListener("click", (e) => {
    const target = e.target;
    const taskItem = target.closest(".task-item");

    if (!taskItem) return;
    const index = taskItem.dataset.index;
    const task = tasks[index];
    if (target.classList.contains("edit")) {
        let newTitle = prompt(`Edit task: ${task.title}`, task.title);
        newTitle = newTitle ? newTitle.trim() : "";
        if (!newTitle || newTitle === "") return;
        if (newTitle.length > 20) {
            alert("Task title should be less than 20 characters.");
            return;
        }

        if (isDuplicateTask(newTitle, index)) {
            alert("Task already exists. Please enter a different task.");
            return;
        }
        task.title = newTitle;

        renderTasks();
        saveTasks();
    } else if (target.classList.contains("done")) {
        task.completed = !task.completed;

        renderTasks();
        saveTasks();
    } else if (target.classList.contains("delete")) {
        if (confirm(`Are you sure you want to delete task: ${task.title}?`)) {
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
        }
    }
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;
    if (isDuplicateTask(title)) {
        alert("Task already exists. Please enter a different task.");
        return;
    }
    const newTask = {
        title,
        completed: false,
    };
    tasks.push(newTask);
    todoInput.value = "";
    todoInput.focus();
    renderTasks();
    saveTasks();
});

function crateTaskElement(task, index) {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.dataset.index = index;
    const span = document.createElement("span");
    span.className = "task-title";
    span.textContent = task.title;
    const actionDiv = document.createElement("div");
    actionDiv.className = "task-action";
    actionDiv.innerHTML = `
        <button class="task-btn edit">Edit</button>
        <button class="task-btn done">${task.completed ? "Mark as undone" : "Mark as done"}</button>
        <button class="task-btn delete">Delete</button>
    `;
    li.append(span, actionDiv);
    return li;
}
function renderTasks() {
    // khi không có task nào thì hiển thị thông báo
    if (tasks.length === 0) {
        taskList.innerHTML = "<li class='empty-message'>No tasks yet. Add a task to get started!</li>";
        return;
    }
    const fragment = document.createDocumentFragment();
    // tạo phần tử li cho mỗi task và thêm vào fragment
    tasks.forEach((task, index) => {
        fragment.appendChild(crateTaskElement(task, index));
    });
    // xóa nội dung cũ của taskList và thêm fragment vào để hiển thị các task mới
    taskList.innerHTML = "";
    taskList.appendChild(fragment);
}
renderTasks();
