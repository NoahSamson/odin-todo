// main Content Replace
export function replaceMainContent(parentDivId, newHTMLContent) {
    const contentDiv = document.getElementById(parentDivId);

    contentDiv.innerHTML = newHTMLContent;

}