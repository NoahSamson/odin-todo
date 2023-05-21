// main Content Replace
export function replaceMainContent(parentDivId, newHTMLContent) {
    const contentDiv = document.getElementById(parentDivId);

    contentDiv.innerHTML = newHTMLContent;
}

export function hideUI(divId) {
    const toHideDiv = document.getElementById(divId);

    toHideDiv.style.display = "none";
}

export function showUI(divId) {
    const toShowDiv = document.getElementById(divId);

    toShowDiv.style.display = "block";
}