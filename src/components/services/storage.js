// Projects

// Generate a unique ID for projects and todos
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}

// Initialize the local Storage
function initializeInboxProject() {
    // check if projects already exists in local Storage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    if(projects.length === 0) {
        createNewProject('Inbox');
    }
}

// Create a new Project
function createNewProject(title) {
    console.log('title');
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const newProject = {
    id: generateUniqueId(),
    title
    // todos: [],
  };

  projects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Get all projects excluding default Inbox
function getAllProjects() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    console.log(projects);
    // return projects.filter((projects) => projects.title !== "Inbox");
    return projects;
  }

function getInbox() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    return projects.filter((projects) => projects.title === "Inbox");
}
// Create a new todo
function createNewTodo(projectId, title, date, priority) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodo = {
    id: generateUniqueId(),
    projectId,
    title,
    date,
    priority,
    completed: false // Set completed as false by default
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  return newTodo;
}

// Modify a todo
function modifyTodo(updatedTodo) {
  console.log(updatedTodo);
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo.id !== updatedTodo.id);
  updatedTodos.push(updatedTodo);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// Delete a todo
function deleteTodo(todoId) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// Get all todos of a specific Project
function getAllTodosByProjectId(projectId) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos.filter((todo) => todo.projectId === projectId);
}

// Get all todos due today
function getTodosDueToday() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const today = new Date().toISOString().split("T")[0];
  return todos.filter((todo) => todo.date === today);
}

// Get all todos due this week
function getTodosDueThisWeek() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const today = new Date();
  const endOfWeek = new Date(today.getTime() + (7 - today.getDay()) * 86400000);
  return todos.filter((todo) => {
    const todoDate = new Date(todo.date);
    return todoDate >= today && todoDate <= endOfWeek;
  });
}

// Delete a project and its associated todos
function deleteProject(projectId) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const updatedProjects = projects.filter(
    (project) => project.id !== projectId
  );
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo.projectId !== projectId);
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// Function to get a project by its ID
function getProjectById(projectId) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  return projects.find((project) => project.id === projectId);
}

export {
  createNewProject,
  createNewTodo,
  modifyTodo,
  deleteTodo,
  getAllTodosByProjectId,
  getTodosDueToday,
  getTodosDueThisWeek,
  deleteProject,
  initializeInboxProject,
  getAllProjects,
  getInbox,
  getProjectById
};
