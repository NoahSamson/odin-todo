// import Stylesheets
import "./todoList.css";

// import views
import getHeader from "../header/header";
import getSideBar from "../sidebar/sidebar";
import getFooter from "../footer/footer";

import noTaskImg from "../../../assets/images/sleeping.png";

export default function todoList() {
  const body = document.querySelector("body");

  const layout = document.createElement("div");
  layout.classList.add("layout");
  const header = getHeader();
  const sidebar = getSideBar();
  const content = getContent();
  const footer = getFooter();

    // body.append(header, sidebar, content, footer)

  layout.append(header, sidebar, content, footer)

  body.append(layout);
}

function getContent() {
  const mainContent = document.createElement("main");
  mainContent.classList.add("content");
  const mainContentText = document.createElement("p");


  mainContentText.innerHTML = "Content Text";

  mainContent.innerHTML += newToDo();

  mainContent.append(mainContentText);
  return mainContent;
}

function newToDo() {
  // const newToDoDiv = document.createElement("div");
  // newToDoDiv.classList.add("new-to-do");

  // newToDoDiv.innerHTML = `
  //   <button>
  //     Add New Task
  //   </button>
  // `;

  // return newToDoDiv;

  return `
    <div class="new-to-do">
      <button>
        <i class="fa fa-plus"></i>
        Add New Task
      </button>
    </div>
    <div class="no-task-img">
      <img src="${noTaskImg}"
      alt="No Task Image" />
    </div>
  `;
}

function displayToDos() {
  const allTodos = document.createElement("div");
  allTodos.classList.add("all-to-dos");
  allTodos.innerHTML = `
  
  `;
}