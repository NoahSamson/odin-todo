// import Stylesheets
import "./footer.css";

export default function getFooter() {
  const footerContent = document.createElement("footer");
  const footerText = document.createElement("p");

  footerText.innerHTML = "Sam";

  footerContent.append(footerText);
  return footerContent;
}
