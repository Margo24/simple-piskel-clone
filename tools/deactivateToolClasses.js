export default function deactivateToolClasses(item) {
    item.childNodes.forEach((element, index) => {
        if (index % 2 !== 0) element.classList.remove('active-tool');
    });
}
