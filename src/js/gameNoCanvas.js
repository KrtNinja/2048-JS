document.body.onload = addElement;
  var my_div = newDiv = null;

  function addElement() {

    var newDiv = document.createElement("div");
        newDiv.innerHTML = "<h1 style='color: yellow;'>2</h1>";

    // добавляем только что созданый элемент в дерево DOM

    my_div = document.getElementById("gameZone");
    document.body.prepend(newDiv, my_div);
  }