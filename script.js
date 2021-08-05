let items;
const listElement = document.getElementById("list");
const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const addItemButton = document.querySelector(".add-item");
const nameInput = document.getElementById("add-name");
const descriptionInput = document.getElementById("add-description");

window.onload = function() {
    initList();
    openModalButton.addEventListener("click", openModal);
    closeModalButton.addEventListener("click", closeModal);
    addItemButton.addEventListener("click", addItem);
}

function initList() {
    if (localStorage.getItem("items") === null) {
        localStorage.setItem("items", "[]");
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    updateList();
}

function updateList() {
    listElement.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const itemElement = document.createElement("li");
        itemElement.className = "item";

        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.id = i.toString();
        checkBox.addEventListener("click", removeItem);

        const label = document.createElement("label");
        label.htmlFor = i.toString();
        label.innerText = item.name;

        const expandButton = document.createElement("button");
        expandButton.className = "expand";
        expandButton.innerText = "+";
        expandButton.addEventListener("click", toggleDescription);

        const description = document.createElement("p");
        description.className = "description";
        description.innerText = item.description;

        itemElement.appendChild(checkBox);
        itemElement.appendChild(label);
        itemElement.appendChild(expandButton);
        itemElement.appendChild(description);

        listElement.appendChild(itemElement);
    }
}

function toggleDescription(event) {
    const expandButton = event.target;
    const description = expandButton.parentElement.querySelector(".description");
    if (expandButton.innerText === "+") {
        description.style.display = "block";
        expandButton.innerText = "-";
    } else {
        description.style.display = "none";
        expandButton.innerText = "+";
    }
}

function addItem() {
    items.push({name: nameInput.value, description: descriptionInput.value});
    localStorage.setItem("items", JSON.stringify(items));

    updateList();

    nameInput.value = "";
    descriptionInput.value = "";
}

function removeItem(event) {
    const checkBox = event.target;
    const id = checkBox.id;
    items.splice(id, 1);
    localStorage.setItem("items", JSON.stringify(items));

    updateList();
}

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

