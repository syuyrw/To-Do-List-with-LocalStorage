const newInput = document.getElementById("input");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const doList = document.getElementById("to-do-list");
const doneList = document.getElementById("done-list");

// Function to capitalize first letter of input string
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// Take input from text box and make new list item
function newItem() {
    let item = newInput.value.trim();
    if (!item) return;

    addItemToList(item, doList, false);

    createArray();

    newInput.value = "";
}

function addItemToList(text, list, isChecked) {
    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.addEventListener("click", (event) => markDone(event));

    //Create label
    const label = document.createElement("label");
    label.textContent = capitalizeFirstLetter(text);

    // Create li
    const li = document.createElement("li");
    li.id = "item-" + Date.now();
    li.appendChild(checkbox);
    li.appendChild(label);
    //console.log(newLi);

    // Add it to the To-Do area
    list.appendChild(li);
}

// If checkbox gets checked, move to Done area. If it is unchecked, move to todo area
function markDone(event) {
    const target = event.target;
    const li = target.parentElement;
    if (target.type === "checkbox" && target.checked) {
        doneList.appendChild(li);
    } else {
        doList.appendChild(li);
    }
    createArray();
}

function createArray() {
    // Initialize local storage array
    let doneArray = JSON.parse(localStorage.getItem("doneArray")) || [];
    let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

    // Convert list items to array
    const todoItems = doList.querySelectorAll("li");
    todoArray = Array.from(todoItems).map((li) => li.textContent.trim());
    const doneItems = doneList.querySelectorAll("li");
    doneArray = Array.from(doneItems).map((li) => li.textContent.trim());
    // console.log(todoArray);
    // console.log(doneArray);

    const list1String = JSON.stringify(todoArray);
    const list2String = JSON.stringify(doneArray);

    // Store string in local storage
    localStorage.setItem("todoArray", list1String);
    localStorage.setItem("doneArray", list2String);

    Object.keys(localStorage).forEach((key) => {
        const value = localStorage.getItem(key);
        //console.log(`${key}: ${value}`);
    });
}

// Function to load lists upon refresh
function loadLists() {
    let doneArray = JSON.parse(localStorage.getItem("doneArray")) || [];
    let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

    todoArray.forEach((text) => {
        addItemToList(text, doList, false);
    });

    doneArray.forEach((text) => {
        addItemToList(text, doneList, true);
    });
}

// function to reset lists
function resetLists() {
    doList.innerHTML = "";
    doneList.innerHTML = "";
    localStorage.clear();
}

loadLists();
submitButton.addEventListener("click", newItem);
resetButton.addEventListener("click", resetLists);
