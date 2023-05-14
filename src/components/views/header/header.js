// import Stylesheets
import './header.css';

// import Images
import headerLogoImg from "./../../../assets/images/logo1.png";


export default function getHeader() {
    const headerContent = document.createElement("header");
    headerContent.classList.add("header");

    const headerLogoDiv = document.createElement("div");
    headerLogoDiv.classList.add("header-logo");

    const headerLogo = document.createElement("img");
    headerLogo.src = headerLogoImg;
    headerLogo.alt = "ToDo list header Logo";

    const headerLogoText = document.createElement("h1");
    headerLogoText.classList.add("logo-text");
    headerLogoText.innerHTML = "TaskMaster"

    headerLogoDiv.append(headerLogo, headerLogoText);

    headerContent.append(headerLogoDiv);
  
    return headerContent;
}