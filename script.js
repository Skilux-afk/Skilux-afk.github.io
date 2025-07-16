const button = document.getElementById("button")
const textField = document.getElementById("textfield")
const ul = document.getElementById("list")


button.addEventListener("click", function() {
    addItem(textField.value);
  });

function addItem(name) {
    const newItem = document.createElement("li")
    newItem.appendChild(document.createTextNode(name))
    ul.appendChild(newItem)
}


function foldOut() {
    let status = ul.style.overflowY

    if(status == "hidden") {
        ul.style.overflowY = "visible"
    }
    else {
        ul.style.overflowY = "hidden"
    }
    
}

ul.onclick = foldOut;