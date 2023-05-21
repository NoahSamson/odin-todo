import "./sidebar.css";

export default function getSideBar() {
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
    <button>
      <i class="fa fa-plus"></i> 
      New Project 
    </button>
  `;

  mainNavDiv.append(newProjectBtnDiv);

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

function displayNewProjectForm() {
  // const overlayDiv = document.createElement("div");
  // overlayDiv.setAttribute("id", "overlay");
  // const newProjectForm = document.createElement("div");

  // newProjectForm.append(overlayDiv);

  // return newProjectForm;

  return `
    <div id="overlay"></div>
    <div id="new-project-form">
      <form>
        <label for="projectName">Project Name </label>
        <input type="text" />
        <button>Submit</button>
      </form>
    </div>
  `

}