import { createNewProject, createNewTodo, getAllTodosByProjectId, getInbox, getProjectById } from "../services/storage";
import { hideUI } from "./navigation";
import { renderProjects, renderTodos } from "./../views/todolist/todolist";
// create a new Project
export function handleNewProjectCreation(event) {
  event.preventDefault();
  console.log(event);
  const form = event.target.form;
  const titleInput = form.querySelector("#project-title-input");
  const title = titleInput.value;

  if (title) {
    createNewProject(title);
    renderProjects();
    hideUI("overlay");
    titleInput.value = "";
  }
}

// Remove Overlay
export function cancelOverlayForm() {
  hideUI("overlay");
}

export function cancelTaskForm() {
  hideUI("overlayTask");
}

// show Overlay
export function toggleOverlayForm() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    if (overlay.style.display === "none") {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  }
}

export function toggleTaskForm() {
  const overlay = document.getElementById("overlayTask");
  if (overlay) {
    if (overlay.style.display === "none") {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  }
  // toggleOverlayForm();
  const taskForm = document.getElementById("new-task-form");
  taskForm.addEventListener("submit", handleNewTaskCreation);
}

export function handleNewTaskCreation(event) {
  event.preventDefault();
  const form = event.target;
  const titleInput = form.querySelector("#task-title-input");
  const dateInput = form.querySelector("#task-date-input");
  const priorityInput = form.querySelector("#task-priority-input");

  console.log('entered');
  const projectId = getSelectedProjectId(); // Assuming you have implemented getSelectedProjectId()
  console.log(projectId);
  const project = getProjectById(projectId);
  const todos = getAllTodosByProjectId(projectId);
  console.log(project);
  if (project) {
    const newTask = createNewTodo(projectId, titleInput.value, dateInput.value, priorityInput.value);
    console.log('entered');
    todos.push(newTask);
    // saveProjects(); // Assuming you have implemented saveProjects() to update the project data in storage
    renderTodos(todos);
    form.reset(); // Reset the form fields
    hideUI("overlayTask");
  }
}

// show default todo
export function renderInboxTodo() {
  renderTodos(getInbox().todos);
}

export function getSelectedProject() {
  const projectButton = document.querySelector(".project-button.active");
  if (projectButton) {
    return projectButton.getAttribute("data-project-title");
  }
  return null;
}

export function getSelectedProjectId() {
  const projectButton = document.querySelector(".project-button.active");
  if (projectButton) {
    return projectButton.getAttribute("data-project-id");
  }
  return null;
}