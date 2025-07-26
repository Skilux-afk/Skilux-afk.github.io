import { db } from './firebase.js'; 

import { ref, push, set, get, onValue, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const listeRef = ref(db, "liste");
const purchases = ref(db, "purchases");

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
        
    });

    loadItemsFirebase();
    loadPurchasedItems();
}


//Firebase
function saveItem(product, date) {
    
    const newItem = push(listeRef);
    set(newItem, {
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

function deleteItem(product, date) {
    get(listeRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val(); // z.B. { "-Mx2...": { product: "Milch", date: "..." }, ... }

            Object.entries(data).forEach(([key, value]) => {
                if (value.product === product && value.date === date) {
                    const itemRef = ref(db, `liste/${key}`);
                    remove(itemRef); // 👈 tatsächliches Löschen
                }
            });
        }
    }).catch((error) => {
        console.error("Fehler beim Löschen:", error);
    });
}

function addPurchase(product, date) {
    const purchasedList = document.querySelector("#purchases");
    const purchasedItem = document.createElement("li");
    purchasedItem.className = "purchasedLi";
    purchasedList.prepend(purchasedItem);

    const p1 = document.createElement("p");
    p1.className = "p1";
    p1.innerText = product;

    const p2 = document.createElement("p");
    p2.className = "p2";
    p2.innerText = date;

    purchasedItem.append(p1, p2);
    
}

function savePurchase(product, date) {
    const newKey = push(purchases);
    set(newKey, {product: product, date: date});
}

function loadPurchasedItems() {
    get(purchases).then((snapshot) => {
        if(snapshot.exists()) {
            const items = Object.values(snapshot.val());
            items.forEach((item) => {
                addPurchase(item.product, item.date);
            })
        }
        else {}
    }).catch(error => {
        console.log(error);
    })
}

function addItem(product, date) {

    //List-item erstellen
    const li = document.createElement("li");
    li.classList.add("activeLi")
    document.querySelector("#activeList").appendChild(li);

    // Delete icon erstellen
    const iconDel = document.createElement("span");
    iconDel.classList.add("material-symbols-outlined");
    iconDel.innerText = "close";
    iconDel.classList.add("close");
    

    //delete an item
    iconDel.addEventListener("click", () => {
        li.classList.add("fade-out");
        setTimeout(() => {
            deleteItem(product, date);
            li.remove();
        }, 400);
        
    })


    // check icon erstellen
    const check = document.createElement("span");
    check.classList.add("material-symbols-outlined");
    check.innerText = "check";
    check.classList.add("check");
    
    //check an item

    check.addEventListener("click", () => {
        

        li.classList.add("slide-left");
        setTimeout(() => {
            li.remove();
            addPurchase(product, date);
            savePurchase(product, date);
            deleteItem(product, date);
        }, 400);
        
    })

    //Produktnamen erstellen
    const p1 = document.createElement("p");
    p1.innerText = product;
    p1.classList.add("product");

    //Datum
    const p2 = document.createElement("p");
    p2.innerText = date;
    p2.className = "date";

    

    li.append(p1,check,iconDel,p2);
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