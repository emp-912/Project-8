class Task {
  constructor(title, description) {
    if (!title || !description) {
      throw new Error("Title and description are required to create a task.");
    }
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  markCompleted() {
    this.completed = true;
    this.updateDisplay();
  }

  updateTask(newTitle, newDescription) {
    if (!newTitle || !newDescription) {
      alert("Both title and description are required.");
      return;
    }
    // Remove old task
    this.removeTask();

    // Update task properties
    this.title = newTitle;
    this.description = newDescription;

    // Display updated task
    this.displayTask();
  }

  removeTask() {
    const taskElement = document.querySelector(`[data-title="${this.title}"]`);
    if (taskElement) {
      taskElement.remove();
    }
  }

  displayTask() {
    const outputDiv = document.getElementById("output");
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.setAttribute("data-title", this.title);

    taskContainer.innerHTML = `
          <p><strong>Task:</strong> ${this.title}</p>
          <p><strong>Description:</strong> ${this.description}</p>
          <p><strong>Completed:</strong> ${this.completed ? "Yes" : "No"}</p>
          <button onclick="markTaskCompleted('${
            this.title
          }')">Mark Completed</button>
          <button onclick="updateTask('${this.title}')">Update Task</button>
          <button onclick="deleteTask('${this.title}')">Delete Task</button>
      `;

    outputDiv.appendChild(taskContainer);
  }

  updateDisplay() {
    this.removeTask();
    this.displayTask();
  }
}

// Global task list
const tasks = [];

// Create a new task
window.createTask = function () {
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();

  if (!title || !description) {
    alert("Please provide both a title and a description.");
    return;
  }

  const task = new Task(title, description);
  tasks.push(task);
  task.displayTask();

  // Clear input fields
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
};

// Mark a task as completed
window.markTaskCompleted = function (title) {
  const task = tasks.find((t) => t.title === title);
  if (task) {
    task.markCompleted();
  }
};

// Update a task
window.updateTask = function (title) {
  const task = tasks.find((t) => t.title === title);
  if (task) {
    const newTitle = prompt("Enter new title:", task.title);
    const newDescription = prompt("Enter new description:", task.description);
    if (newTitle && newDescription) {
      task.updateTask(newTitle.trim(), newDescription.trim());
    }
  }
};

// Delete a task
window.deleteTask = function (title) {
  const taskIndex = tasks.findIndex((t) => t.title === title);
  if (taskIndex !== -1) {
    tasks[taskIndex].removeTask();
    tasks.splice(taskIndex, 1);
  }
};

export { createTask };
