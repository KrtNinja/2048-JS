let createAndAppend = function({tag, className, parentElement, value} = {tag : 'div', className, parentElement, value}){
    let element = document.createElement(tag);
    element.className = className;
    if (value){
        element.innerHTML = value;
    }
    parentElement.appendChild(element);

    return element;
}

new Game(document.body, 4);