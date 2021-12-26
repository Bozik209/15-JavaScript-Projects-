// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener("click", clearItems);
// load items
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem(id, value);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value chance", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// action -> danger = red , success = green
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1500);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  // Remove the the specified local storage item
  localStorage.removeItem("list");
}

// delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }

  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  // The previousElementSibling property returns the previous element of the specified element, in the same tree level.
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
  submitBtn.style.backgroundColor = "hsl(125, 71%, 66%)";
}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
  submitBtn.style.backgroundColor = "hsl(205, 86%, 81%)";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  // When sending data to a web server, the data has to be a string.
  // Use the JavaScript function JSON.stringify() to convert it into a string.
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  // Return an array of all values in items[] that are id
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  console.log(items);
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  // The localStorage opject allows you to save key/value pairs in the browser.
  // check if list is exist
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function createListItem(id, value) {
  //  The createElement() method creates an Element Node with the specified name.
  const element = document.createElement("article");
  // add class
  element.classList.add("grocery-item");
  // add id - The createAttribute() method creates an attribute with the specified name, and returns the attribute as an Attr object.
  const attr = document.createAttribute("data-id");
  attr.value = id;
  // The setAttributeNode() method adds the specified attribute node to an element.
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
   <div class="btn-container">
     <button type="button" class="edit-btn">
       <i class="fas fa-edit"></i>
     </button>
     <button type="button" class="delete-btn">
       <i class="fas fa-trash"></i>
     </button>
   </div>`;

  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  // append child - The appendChild() method appends a node as the last child of a node.
  list.appendChild(element);
}
