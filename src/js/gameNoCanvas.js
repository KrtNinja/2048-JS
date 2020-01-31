document.body.onload = addElement;
  var my_div = newDiv = null;

  function addElement() {

    var newDiv = document.createElement("div");
        newDiv.innerHTML = "<h1>Привет!</h1>";

    // добавляем только что созданый элемент в дерево DOM

    my_div = document.getElementById("gameArea");
    document.body.innerHTML(newDiv, my_div);
  }