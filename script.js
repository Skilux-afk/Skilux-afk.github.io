import { db } from './firebase.js'; // relativer Pfad!

import { ref, push, set, get, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const listeRef = ref(db, "liste");

window.onload = () => {
    const list = document.getElementById("list");
    const addButton = document.getElementById("add");
    const textfield = document.getElementById("textfield"); 

    addButton.addEventListener("click", () => {
        let input = textfield.value;
        if (input == "") {
            return
        }
        addItem(input, currentDate());
        saveItem(input, currentDate());
        textfield.value = "";
        //saveItems();
    });

    loadItemsFirebase();
    //loadItems();
}


//Firebase
function saveItem(product, date) {
    
    const neuerEinkauf = push(listeRef);
    set(neuerEinkauf, {
        product: product,
        date: date
    });
}



function getItemsFirebase() {
    return get(listeRef).then((snapshot) => {
        if(snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        else {
            return {};
        }
    
        
    }).catch((error) => {
        console.log(error);
        return {};
    })
        
}

function loadItemsFirebase() {
    getItemsFirebase().then(items => {
        items.forEach(item => {
            addItem(item.product, item.date);
        })
        
    })
    
}



function getItems() {
    return JSON.parse(localStorage.getItem("einkaufsliste")) || [];
}

function loadItems() {
    for(let item of getItems()) {
        addItem(item.product, item.date);
    }
}

function saveItems() {

    const groceries = [];
    const dates = [];

    document.querySelectorAll(".product").forEach( (elmnt) => {
        groceries.push(elmnt.innerText);
    })

    document.querySelectorAll(".date").forEach((date, index ) => {
        dates[index] = date.innerText;
    })

    const items = groceries.map((grocery, index) => 
        ({product: grocery, date : dates[index]}
    ));
            
    localStorage.setItem("einkaufsliste", JSON.stringify(items));


    

    
}    


function addItem(product, date) {

    //List-item erstellen
    const li = document.createElement("li");
    document.querySelector("ul").appendChild(li);

    // Delete icon erstellen
    const iconDel = document.createElement("span");
    iconDel.classList.add("material-symbols-outlined");
    iconDel.innerText = "close";
    iconDel.classList.add("close");
    

    //delete item
    iconDel.addEventListener("click", () => {
        li.classList.add("fade-out");
        setTimeout(() => {
            removeItem(product, date);
            li.remove();
        }, 400);
        
    })


    // check icon erstellen
    const check = document.createElement("span");
    check.classList.add("material-symbols-outlined");
    check.innerText = "check";
    check.classList.add("check");
    
    

    //Produktnamen erstellen
    const p1 = document.createElement("p");
    p1.innerText = product;
    p1.classList.add("product");

    //Datum
    const p2 = document.createElement("p");
    p2.innerText = date;
    p2.className = "date";

    //check item

    let crossed = false;
    check.addEventListener("click", () => {
        
        if(!crossed) {
            p1.style.textDecoration = "line-through";
            crossed = true;
        }
        else {
            p1.style.textDecoration = "none";
            crossed = false;
        }
        
    })

    li.append(p1,check,iconDel,p2);
    


    

}

function removeItem(product, date) {
    const items =  getItems()
    const sortedItems = items.filter(item => !(item.product === product && item.date === date));
    localStorage.setItem("einkaufsliste", JSON.stringify(sortedItems));
    
}

function currentDate() {
    let dateObj = new Date();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();
    let day = "";
    switch (dateObj.getDay()) {
        case 1: day = "Montag"
        break;
        case 2: day = "Dienstag"
        break;
        case 3: day = "Mittwoch"
        break;
        case 4: day = "Donnerstag"
        break;
        case 5: day = "Freitag"
        break;
        case 6: day = "Samstag"
        break;
        case 0: day = "Sonntag"
        break;    
        }

    return `${day}, ${hour} : ` + minute.toString().padStart(2,"0");
}