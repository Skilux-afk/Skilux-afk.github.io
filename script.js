
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAF_96r3Odby5ka8FH1S7V0fa1cOgGx3vk",
    authDomain: "einkaufsliste-35fc9.firebaseapp.com",
    projectId: "einkaufsliste-35fc9",
    storageBucket: "einkaufsliste-35fc9.firebasestorage.app",
    messagingSenderId: "561414364840",
    appId: "1:561414364840:web:036de241c80129fba9ec9d",
    measurementId: "G-RSGX9PVYWJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);




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
        textfield.value = "";
        saveItems();
    });
    
    for(item of loadItems()) {
        addItem(item.product, item.date);
    }



    
    

}

function loadItems() {
    return JSON.parse(localStorage.getItem("einkaufsliste")) || [];
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

    //Listitem erstellen
    const li = document.createElement("li");
    document.querySelector("ul").appendChild(li);

    
    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";
    icon.innerText = "delete";

    icon.addEventListener("click", () => {

         li.classList.add("fade-out");
        setTimeout(() => {
            removeItem(product, date);
            li.remove();
        }, 400);
        
    })

    //Produktnamen anfügen
    const p1 = document.createElement("p");
    p1.innerText = product;
    p1.classList.add("product");

    //Datum anfügen
    const p2 = document.createElement("p");
    p2.innerText = date;
    p2.className = "date";

    li.append(p1,p2,icon);
    

}

function removeItem(product, date) {
    const items =  loadItems().filter(item => !(item.product === product && item.date === date));
    localStorage.setItem("einkaufsliste", JSON.stringify(items));
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