let createAndAppend = function({className, parentElement, value}, tag = 'div'){
    let element = document.createElement(tag);
    element.className = className;
    if (value){
        element.innerHTML = value;
    }
    parentElement.appendChild(element);

    return element;
}

let randomInt = function (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// let fieldSize = window.prompt('Field size?', 4);
let fieldSize = 4;

var game = new Game(document.body, fieldSize);
