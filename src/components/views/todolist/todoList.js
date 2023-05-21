// import Stylesheets
import "./todoList.css";

//  import images
import headerLogoImg from "./../../../assets/images/logo1.png";
import noTaskImg from "../../../assets/images/sleeping.png";

// import functions
// import { handleNewTaskButton } from "../../helpers/navigation";
import { hideUI } from "../../helpers/navigation";
import { showUI } from "../../helpers/navigation";
import { getAllTodosByProjectId, initializeInboxProject, modifyTodo } from "../../services/storage";
import {
  cancelOverlayForm,
  cancelTaskForm,
  toggleOverlayForm,
} from "../../helpers/eventListeners";
import { handleNewProjectCreation } from "../../helpers/eventListeners";
import { getAllProjects } from "../../services/storage";
import { renderInboxTodo } from "../../helpers/eventListeners";
import { getSelectedProject } from "../../helpers/eventListeners";
import { toggleTaskForm } from "../../helpers/eventListeners";

export default function todoList() {
  const body = document.querySelector("body");

  const layout = document.createElement("div");
  layout.classList.add("layout");
  const header = getHeader();
  const sidebar = getSideBar();
  const content = getContent();
  const footer = getFooter();

  // body.append(header, sidebar, content, footer)

  layout.append(header, sidebar, content, footer);
  body.append(layout);

  window.addEventListener("DOMContentLoaded", () => {
    initializeInboxProject();
    initButtons();
    renderProjects();
    // renderInboxTodo();
  });
}

function getHeader() {
  const headerContent = document.createElement("header");
  headerContent.classList.add("header");

  const headerLogoDiv = document.createElement("div");
  headerLogoDiv.classList.add("header-logo");

  const headerLogo = document.createElement("img");
  headerLogo.src = headerLogoImg;
  headerLogo.alt = "ToDo list header Logo";

  const headerLogoText = document.createElement("h1");
  headerLogoText.classList.add("logo-text");
  headerLogoText.innerHTML = "TaskMaster";

  headerLogoDiv.append(headerLogo, headerLogoText);

  headerContent.append(headerLogoDiv);

  return headerContent;
}

function getFooter() {
  const footerContent = document.createElement("footer");
  const footerText = document.createElement("p");

  footerText.innerHTML = "Sam";

  footerContent.append(footerText);
  return footerContent;
}

function getSideBar() {
  const sidebarContent = document.createElement("aside");
  sidebarContent.classList.add("sidebar");

  const mainNavDiv = document.createElement("div");
  mainNavDiv.classList.add("main-buttons-container");

  const timedNavDiv = document.createElement("div");
  timedNavDiv.classList.add("timed-buttons-container");
  timedNavDiv.innerHTML = `
    <button class="main-button">Inbox</button>
    <button class="main-button">Today</button>
    <button class="main-button">Upcoming</button>
  `;
  mainNavDiv.append(timedNavDiv);

  const newProjectBtnDiv = document.createElement("div");
  newProjectBtnDiv.classList.add("new-project-btn");
  newProjectBtnDiv.innerHTML = `
    <button id = "new-project-btn">
      <i class="fa fa-plus"></i> 
      New Project 
    </button>
  `;

  mainNavDiv.append(newProjectBtnDiv);

  const projectsListHTML = `
          <div class="project-list">
          <p> No Projects </p>
          </div>
  `;
  mainNavDiv.innerHTML += projectsListHTML;

  // Define the accordion items as an array of objects
  const accordionItems = [
    { header: "Favourite", buttonText: "Button 1" },
    { header: "Section zcvfasdzvsdc", buttonText: "Button 2" },
    { header: "Section 3", buttonText: "Button 3" },
  ];

  // Create the HTML for the accordion menu using template literals
  const accordionHTML = `
    <div class="accordion">
      ${accordionItems
        .map(
          (item, index) => `
          <div class="accordion-item">
            <div class="accordion-header" data-index="${index}">
              <span class="accordion-arrow"></span>
              <span class="accordion-title">${item.header}</span>
            </div>
            <div class="accordion-content">
              <button>${item.buttonText}</button>
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;

  // Insert the generated HTML into a container element
  mainNavDiv.innerHTML += accordionHTML;

  sidebarContent.append(mainNavDiv);

  // Add click event listeners to the accordion headers
  const accordionHeaders = sidebarContent.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const index = header.getAttribute("data-index");
      const content = header.nextElementSibling;

      // Toggle active class on the clicked header
      header.classList.toggle("active");

      // Toggle the display of the content
      content.style.display =
        content.style.display === "block" ? "none" : "block";

      // Toggle the arrow icon
      const arrow = header.querySelector(".accordion-arrow");
      arrow.classList.toggle("active");
    });
  });

  return sidebarContent;
}

function getContent() {
  const mainContent = document.createElement("main");
  mainContent.classList.add("content");

  mainContent.innerHTML += newToDo();
  mainContent.innerHTML += displayNewProjectForm();
  mainContent.innerHTML += displayNewTaskForm();

  return mainContent;
}

function newToDo() {
  return `
    <div class="new-to-do">
      <button id="new-task-btn">
        <i class="fa fa-plus"></i>
        Add New Task
      </button>
    </div>
    <div class="todo-list">
    </div>
  `;
}

function displayToDos(todos) {
  const todosContainer = document.createElement("div");
  todosContainer.classList.add("todos-container");

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.completed;
    todoCheckbox.addEventListener("change", () => {
      todo.completed = todoCheckbox.checked;
      modifyTodo(todo);
    });

    const todoTitle = document.createElement("span");
    todoTitle.classList.add("todo-title");
    todoTitle.innerText = todo.title;

    const todoPriority = document.createElement("span");
    todoPriority.classList.add("todo-priority");
    todoPriority.innerText = `Priority: ${todo.priority}`;

    const todoDate = document.createElement("span");
    todoDate.classList.add("todo-date");
    todoDate.innerText = `Date: ${todo.date}`;

    todoItem.append(todoCheckbox, todoTitle, todoPriority, todoDate);
    todosContainer.append(todoItem);
  });

  return todosContainer;
}

function initButtons() {
  const newProjectBtn = document.getElementById("new-project-btn");
  newProjectBtn.addEventListener("click", toggleOverlayForm);

  const cancelProjectBtn = document.getElementById("cancel-btn");
  cancelProjectBtn.addEventListener("click", cancelOverlayForm);

  const submitProjectBtn = document.getElementById("submit-btn");
  submitProjectBtn.addEventListener("click", handleNewProjectCreation);

  const newTaskBtn = document.getElementById("new-task-btn");
  newTaskBtn.addEventListener("click", toggleTaskForm);

  const cancelTaskBtn = document.getElementById("cancel-task-btn");
  cancelTaskBtn.addEventListener("click", cancelTaskForm);
}

function displayNewProjectForm() {
  return `
    <div id="overlay" class="overlay">
      <div id="new-project-form">
      <h2> Create New Project </h2>
        <form>
        <input type="text" id="project-title-input" name="projectTitle placeholder="Project Title" required>
        <button type="submit" id="submit-btn">Create</button>
        <button type="button" id="cancel-btn" class="cancel">Cancel</button>
        </form>
      </div>
    </div>
  `;
}

function displayNewTaskForm() {
  const selectedProject = getSelectedProject();
  const projectTitle = selectedProject ? selectedProject.title : "Inbox";

  return `
  <div id="overlayTask" class="overlay">
    <div id="new-task-form">
      <h2>Add New Task</h2>
      <p>Project: <span id="project-title">${projectTitle}</span></p>
      <form>
        <input type="text" id="task-title-input" placeholder="Task Title" required>
        <input type="date" id="task-date-input" required>
        <select id="task-priority-input" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" id="submit-task-btn">Create</button>
        <button type="button" id="cancel-task-btn" class="cancel">Cancel</button>
      </form>
    </div>
    </div>
  `;
}

export function renderProjects() {
  const projectsContainer = document.querySelector(".project-list");

  // clear existing projects
  projectsContainer.innerHTML = "";

  // Get the projects from storage
  const projects = getAllProjects();

  // Render each project as a button
  projects.forEach((project, index) => {
    const projectButton = document.createElement("button");
    projectButton.classList.add("project-button");
    projectButton.innerHTML = project.title;
    console.log("projectID assign");
    console.log(project.id);

    // Add data attribute for project ID
    projectButton.setAttribute("data-project-id", project.id);
    projectButton.setAttribute("data-project-title", project.title);

    if(project.title === "Inbox") {
      console.log('added active');
      projectButton.classList.add('active');
    }

    // add EventListener to show todos on click
    projectButton.addEventListener("click", () => {
      // Add/remove active class
      const activeButton = projectsContainer.querySelector(
        ".project-button.active"
      );
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      projectButton.classList.add("active");
      console.log('clicked');
      renderTodos(getAllTodosByProjectId(project.id));
    });

    projectsContainer.appendChild(projectButton);
  });
}

export function renderTodos(todos) {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = ""; // clear existing content

  console.log(todos);

  // Get the selected project ID
  const selectedProjectTitle = getSelectedProject();

  // Display the project name
  const projectNameElement = document.createElement("h2");
  projectNameElement.innerText = selectedProjectTitle
    ? `Project: ${selectedProjectTitle}`
    : "Project: Inbox";
  todoList.appendChild(projectNameElement);
  console.log(selectedProjectTitle);

  // Display the todos
  if (todos && todos.length > 0) {
    const todosContainer = displayToDos(todos);
    todoList.appendChild(todosContainer);
  } else {
    console.log("else");
    todoList.innerHTML += `
      <div class="no-task-img">
        <img src="${noTaskImg}" alt="No Task Image" />
      </div>
    `;
  }
}
